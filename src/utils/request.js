import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service =  axios.create({
  baseURL: 'http://localhost:8781', // api的base_url
  timeout: 5000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  config.headers = {
    'token' : getToken(), //携带token
  };
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非1是抛错 可结合自己业务进行修改
  * code:200,接口正常返回;-1:返回的数据不对;
  */
  const res = response.data
    if (res.code != 0) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 402 ) {
        MessageBox.confirm('登陆以失效，请重新登陆！', '', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }else if (res.code === 403 ) {
        MessageBox.alert('网络拥堵，稍后重试').then(r => {

        });
      }else if (res.code === 404 ) {
        MessageBox.alert('接口找不到').then(r => {

        });
      }else if (res.code === 500 ) {
        MessageBox.alert('网络异常').then(r => {

        });
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
