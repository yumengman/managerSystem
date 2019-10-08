<template>
    <el-header>
      <div :class="isCollapse ? 'logo min-logo':'logo' " style="float:left">
          <img src="@/assets/logo.png" alt="logo">
          <span>后台管理系统</span>
      </div>

      <div class="userInfo">
          <div class="user-avator"><img src="../../assets/user2.gif"></div>
          <el-dropdown>
              <span style="margin-left: 15px;color:#fff">{{username}}</span>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="toUserinfo">个人信息</el-dropdown-item>
                  <el-dropdown-item @click.native="toChangePwd">修改密码</el-dropdown-item>
                  <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
      </div>
  </el-header>

</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import request from '@/utils/request'
import {removeToken} from '@/utils/auth'
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
    //这里存放数据
        return {
            username:localStorage.getItem('ms_username'),
            isCollapse:false,
            changeBarDirection:false
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        if (this.username == undefined || this.username == '' || this.username == null || this.username == "null"){
            this.username = localStorage.getItem('mobile');
        }
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    //方法集合
    methods: {
        toUserinfo(){
          this.$router.push('../user/userinfo')
        },
        toChangePwd(){
          this.$router.push('../user/changePwd')
        },
        loginOut(){
            request({
                url: '/api/logout.json',
                method: 'post'
            }).then(response => {
                removeToken(); // 移除token
                this.$router.push('/')
            });
        }
    },
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.userInfo{
  float:right;
  width:200px;
  display:flex;
  align-items:center;
  justify-content:center;
}
.logo{
  width:200px;
  transition:width 0.5s linear;
  img{
    height:60px;
    vertical-align: middle;
  }
  span{
    vertical-align: middle;
  }
}
.min-logo{
  width:60px;
  transition:width 0.3s;
}
.user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
.el-header {
    width:100%;
    height:60px;
    padding:0;
    margin:0;
    background-color: #061f3e;
    color: #fff;
    line-height: 59px;
    text-align:left;
  }
</style>
