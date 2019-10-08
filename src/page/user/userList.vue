<template>
    <div>
        <!--    查询条件    -->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="selectForm" rel="selectForm">
                <el-form-item label="用户名称" prop="userName">
                    <el-input v-model="selectForm.userName" placeholder="用户名称"></el-input>
                </el-form-item>
                <el-form-item label="用户手机号" prop="mobile">
                    <el-input v-model="selectForm.mobile" placeholder="用户手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getUserList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="reset">重置</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleadd">新增</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="deleteUserList(sels)" :disabled="this.sels.length === 0"> 批量删除</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--  列表 -->
        <el-table :data="userList" @cell-dblclick="handleEdit" @selection-change="selsChange"  ref="table" style="width: 100%;" highlight-current-row>
            <el-table-column type="selection" width="55" prop="id">
            </el-table-column>
            <el-table-column label="序号" type="index" width="50">
            </el-table-column>
            <el-table-column prop="userName" label="名称" width="120">
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" width="150">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="150" >
            </el-table-column>
            <el-table-column prop="isUse" label="状态" :formatter="format" width="150" >
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" :formatter="dateFormat1" width="200" >
            </el-table-column>
            <el-table-column prop="updateTime" label="修改时间" :formatter="dateFormat2" width="200" >
            </el-table-column>
            <el-table-column prop="remarks" label="备注" min-width="150" >
            </el-table-column>
        </el-table>
        <!--分页工具-->
        <el-row>
            <el-col :span="24" class="toolbar">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change = "handleCurrentChangePage"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 40]"
                        :page-size="pageSize"
                        :page-count="7"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount">
                </el-pagination>
            </el-col>
        </el-row>
        <!-- 新增弹框 -->
        <el-dialog title="新增" :visible.sync="insertFormVisible">
            <el-form :model="insertForm" label-width="80px" :rules="insertFormRules" ref="insertForm">
                <el-form-item label="姓名" prop="userName">
                    <el-input v-model="insertForm.userName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="insertForm.mobile" auto-complete="off" ></el-input>
                </el-form-item>
<!--                <el-form-item label="密码" prop="password">-->
<!--                    <el-input type="password" v-model="insertForm.password" auto-complete="off" ></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="确认密码" prop="checkPass">-->
<!--                    <el-input type="password" v-model="insertForm.checkPass" auto-complete="off" ></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="地址" prop="address">
                    <el-input type="textarea" v-model="insertForm.address" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remarks">
                    <el-input type="textarea" v-model="insertForm.remarks" auto-complete="off" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click ="insertFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addUser" >提交</el-button>
                <el-button @click ="addCancel" >重置</el-button>
            </div>
        </el-dialog>
        <!-- 编辑弹框       -->
        <el-dialog title="编辑" :visible.sync="editFormVisible">
            <el-form :model="insertForm" label-width="80px" :rules="insertFormRules" ref="insertForm">
                <el-form-item label="姓名" prop="userName">
                    <el-input v-model="insertForm.userName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="insertForm.mobile" :disabled="true" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input type="textarea" v-model="insertForm.address" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remarks">
                    <el-input type="textarea" v-model="insertForm.remarks" auto-complete="off" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="updateUser" >提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import request from '@/utils/request'
import { MessageBox } from 'element-ui'
export default {
    name: "userList",
    data() {
        // 定义数据类型
        return {
            insertFormVisible: false,
            editFormVisible: false,
            currentPage: 1, //初始页
            pageSize: 10, // 每页条数
            totalCount: 1, // 总条数
            userList: [], // 列表记录
            sels: [],//选中的记录
            insertFormRules: {
                userName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^((13|14|15|17|18|16|19)[0-9]\d{8})$/, message: '手机号格式输入错误' }
                ],
                // password: [
                //     { required: true, message: '请输入密码', trigger: 'blur' },
                //     { min: 6, max: 18, message: '密码长度在6位至18位之间', trigger: 'blur' }
                // ],
                // checkPass: [
                //     { required: true, message: '请在次输入密码', trigger: 'blur' },
                //     { validator:(rule,value,callback)=>{
                //             if(value===''){
                //                 callback(new Error('请再次输入密码'))
                //             }else if(value!==this.insertForm.password){
                //                 callback(new Error('两次输入密码不一致'))
                //             }else{
                //                 callback( )
                //             }
                //         }
                //     }
                // ],
            },
            selectForm: {
                userName: '',
                mobile: '',
                pageNum: 1, //初始页
                pageSize: 10,
                totalCount: 1,
            },
            insertForm: {
                id: '',
                userName: '',
                mobile: '',
                address: '',
                password: '',
                checkPass: '',
                remarks: '',
            },
        }
    },
    // 初始化执行
    mounted() {
        this.getUserList();
    },
    // 所有方法
    methods: {
        // 获取用户列表
        getUserList() {
            request({
                url: '/api/selectList.json',
                method: 'post',
                data: {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    userName: this.selectForm.userName,
                    mobile: this.selectForm.mobile,
                }
            }).then(response => {
                if (response.code != 0) {
                    this.$message.error(response.message)
                } else {
                    this.userList = response.data.list;
                    this.totalCount = response.data.total;
                }
            });
        },
        // 新增用户
        addUser(){
            this.$refs['insertForm'].validate((valid) =>{
                if (valid){
                    request({
                        url: '/api/regist.json',
                        method: 'post',
                        data:{
                            userName: this.insertForm.userName,
                            mobile: this.insertForm.mobile,
                            address: this.insertForm.address,
                            password: this.insertForm.password,
                            remarks: this.insertForm.remarks,
                        }
                    }).then(response =>{
                        if (response.code != 0) {
                            this.$message.error(response.message)
                        } else {
                            this.insertFormVisible = false;
                            this.getUserList(); // 刷新列表
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        // 修改用户
        updateUser(){
            this.$refs['insertForm'].validate((valid) =>{
              if (valid){
                  request({
                      url: '/api/update.json',
                      method: 'post',
                      data:{
                          id: this.insertForm.id,
                          userName: this.insertForm.userName,
                          mobile: this.insertForm.mobile,
                          address: this.insertForm.address,
                          remarks: this.insertForm.remarks,
                      }
                  }).then(response =>{
                      if (response.code != 0) {
                          this.$message.error(response.message)
                      } else {
                          this.editFormVisible = false;
                          this.getUserList(); // 刷新列表
                      }
                  });
              } else {
                  return false;
              }
            });
        },
        deleteUserList(){
            let selsIds = [];
            for(let i = 0; i < this.sels.length; i++){
                selsIds.push(this.sels[i].id);
            }

            MessageBox.confirm('确定要删除账号？', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                request({
                    url: '/api/delete.json',
                    method: 'post',
                    data: selsIds ,
                }).then(response =>{
                    if (response.code != 0) {
                        this.$message.error(response.message)
                    } else {
                        this.getUserList(); // 刷新列表
                    }
                });
            })
        },
        // 修改每页条数
        handleSizeChange: function (size) {
            this.pageSize = size;
            this.getUserList();
        },
        // 修改页码
        handleCurrentChangePage: function (currentPage) {
            this.currentPage = currentPage;
            this.getUserList();
        },
        // 点击新增、展示新增页面
        handleadd: function () {
            this.insertFormVisible = true;
            this.insertForm.id = '';
            this.insertForm.userName = '';
            this.insertForm.mobile = '';
            this.insertForm.address = '';
            this.insertForm.remarks = '';
        },
        // 双击展示编辑页面
        handleEdit: function (row) {
            request({
                url: '/api/selectByIdDetail.json?id=' + row.id,
                method: 'get',
            }).then(response =>{
                if (response.code != 0) {
                    this.$message.error(response.message)
                } else {
                    this.editFormVisible = true;
                    this.insertForm = Object.assign({}, response.data);
                }
            })

        },
        // 选中的记录
        selsChange(sels) {
            this.sels = sels
        },
        // 状态转换
        format: function(row){
            return row.isUse == 0 ? '在职'  : row.isUse == 1 ? '离职' : row.isUse == 2 ? '辞退'  : row.isUse == 3 ? '退休' : '其他';
        },
        // 时间格式化
        //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
        dateFormat1:function(row) {
            return this.formatYearMonthDay(row.createTime);
        },
        dateFormat2:function(row) {
           return this.formatYearMonthDay(row.updateTime);
        },
        formatYearMonthDay(time){
            let date=new Date(time);
            let year=date.getFullYear();
            /* 在日期格式中，月份是从0开始的，因此要加0
             * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
             * */
            let month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
            let day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
            let hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
            let minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
            let seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
            // 拼接
            return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
        },
        // 重置按钮
        reset: function (){
            this.selectForm.userName = ''; // 重置用户名称查询条件
            this.selectForm.mobile = ''; // 重置手机号查询条件
        },
        // 新增重置
        addCancel: function () {
            this.$refs['insertForm'].resetFields();
        },
    }
}
</script>

<style lang='scss' scoped>
    //@import url(); 引入公共css类
    @import "../../../static/css/mixin";

    .toolbar {
        background: #fff;
        padding: 10px;
        //border:1px solid #dfe6ec;
        margin: 0 0 10px 0;

        .el-form-item {
            margin-bottom: 10px;
        }
    }

    .el-pagination {
        background: #fff;
    }

    .el-table {
        overflow: auto;
        max-height: 475px;
    }

    .el-table::before {
        content: none;
        font-size: 10px;
    }
</style>
