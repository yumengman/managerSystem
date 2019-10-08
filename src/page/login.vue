<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model.trim="ruleForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model.trim="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="login('ruleForm')">登录</el-button>
                </div>
                <div class="login-btn">
                    <el-button type="primary" v-on:click="showRegist" >注册</el-button>
                </div>
            </el-form>
        </div>
        <el-dialog :visible.sync="registFlag">
            <el-form :model="registForm" label-width="20%" :rules="registRules" ref="registForm">
                <el-form-item label="公司名称" prop="companyName">
                    <el-input v-model.trim ="registForm.companyName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="管理员手机号" prop="mobile">
                    <el-input v-model.trim="registForm.mobile" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="管理员登陆密码" prop="password">
                    <el-input type="password" v-model.trim="registForm.password" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input type="textarea" v-model="registForm.address" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remarks">
                    <el-input type="textarea" v-model="registForm.remarks" auto-complete="off" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click.native="registFlag = false">取消</el-button>
                <el-button type="primary" @click.native="regist" >提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import request from '@/utils/request'
import {setToken} from '@/utils/auth'
    export default {
        data: function(){
            return {
                registFlag: false,
                ruleForm: {
                    username: '18537757128',
                    password: '123456'
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        {min: 6, max: 18, message: '密码最少6位', trigger: 'blur'}
                    ]
                },
                registForm: {
                    companyName:'',
                    mobile:'',
                    password:'',
                    address:'',
                    remarks:'',
                },
                registRules: {
                    companyName: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { pattern: /^((13|14|15|17|18|16|19)[0-9]\d{8})$/, message: '手机号格式输入错误' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 18, message: '密码长度在6位至18位之间', trigger: 'blur' }
                    ],
                },
            }
        },
        methods: {
            // 登陆
            login(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {'mobile':this.ruleForm.username,'password':this.ruleForm.password};
                        request({
                            url: '/api/login.json',
                            method: 'post',
                            data: data
                        }).then(response => {
                            localStorage.setItem('ms_username',response.data.dataUser.userName);
                            localStorage.setItem('mobile',this.ruleForm.username);
                            setToken(response.data.token);
                            this.$router.push('/home');
                        }).catch(error => {});
                    }
                });
            },
            // 注册
            regist() {
                request({
                    url: '/api/companyRegist.json',
                    method: 'post',
                    data: this.registForm
                }).then(response => {
                    location.href = '/login'
                }).catch(error => {});
            },
            // 展示注册弹框
            showRegist(){
                this.registFlag = true;
                this.$refs['registForm'].resetFields(); // 重置registForm
            }
        }
    }
</script>

<style lang='scss' scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background: url(../assets/login-bg.jpg) no-repeat;
        background-size: cover;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #0f0f0f;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .tiparea{
		text-align:left;
		font-size: 12px;
		color: #4cbb15;
		padding: 10px 0;
		.tip{
			margin-left: 54px;
		}
		.tips{
			color:red;
		}
	}
</style>
