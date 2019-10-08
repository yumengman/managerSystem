<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="width:30%;"
             class="demo-ruleForm">
        <el-form-item label="手机号" prop="mobile">
            <el-input type="mobile" :disabled="true" v-model="ruleForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="原密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
            <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import request from '@/utils/request'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
return {
     ruleForm: {
          mobile: localStorage.getItem('mobile'),
          pass: '',
          newPass: '',
          checkPass: '',
        },
        rules: {
            pass: [
                { required: true, message: '请输入原密码', trigger: 'blur' },
            ],
            newPass: [
                { required: true, message: '请输入新密码', trigger: 'blur' },
                { min: 6, max: 18, message: '密码长度在6位至18位之间', trigger: 'blur' },
                { validator:(rule,value,callback)=>{
                       if(value === this.ruleForm.pass){
                            callback(new Error('新密码不能和原密码一致'))
                        }else{
                            callback( )
                        }
                    }
                }
            ],
            checkPass: [
                { required: true, message: '请再次输入密码', trigger: 'blur' },
                { validator:(rule,value,callback)=>{
                        if(value===''){
                            callback(new Error('请再次输入密码'))
                        }else if(value!==this.ruleForm.newPass){
                            callback(new Error('两次输入密码不一致'))
                        }else{
                            callback( )
                        }
                    }
                }
            ],
        }
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
//方法集合
methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              request({
                  url: '/api/updatePassword.json',
                  method: 'post',
                  data:{
                      mobile: this.ruleForm.mobile,
                      password: this.ruleForm.pass,
                      newPassword: this.ruleForm.newPass
                  }
              }).then(response =>{
                  if (response.code != 0) {
                      this.$message.error(response.message)
                  } else {
                      this.$message.success(response.message)
                  }
              })
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
},
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>
