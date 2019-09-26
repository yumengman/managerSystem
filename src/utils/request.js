import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service =  axios.create({
  baseURL: process.env.BASE_API, // api的base_url
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
  * code为非0是抛错 可结合自己业务进行修改
  * code:200,接口正常返回;-1:返回的数据不对;
  */
  const res = response.data
    if (res.code != 0) {
      //  402:Token 过期了;
      if (res.code == 402 ) {
        MessageBox.confirm('登陆已失效，请重新登陆！', '', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          location.href = '/login'
        })
      }else if (res.code == 403 ) {
        MessageBox.alert('网络拥堵，稍后重试').then(r => {
          return;
        });
      }else if (res.code == 404 ) {
        MessageBox.alert('接口找不到').then(r => {
          return;
        });
      }else if (res.code == 500 ) {
        MessageBox.alert('网络异常').then(r => {
          return;
        });
      }
      Message({
        message: res.message,
        type: 'error',
        duration: 3000
      })
      return Promise.reject(res.message);
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
