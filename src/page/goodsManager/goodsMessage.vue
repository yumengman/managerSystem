<template>
<div>

        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

    <el-table :data="tableData" highlight-current-row v-loading="listLoading" @selection-change="handleSelectionChange" style="width: 100%;">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="name" label="姓名" width="120" sortable></el-table-column>
			<el-table-column prop="age" label="年龄" width="100" sortable></el-table-column>
			<el-table-column prop="date" label="生日" width="120" sortable></el-table-column>
			<el-table-column prop="address" label="地址" width="150" sortable show-overflow-tooltip></el-table-column>
			<el-table-column label="操作" width="">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
        </el-pagination>
        <!--编辑界面-->
        <el-dialog title="编辑" :visible.sync="editFormVisible">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.date"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.address"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
</div>


</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    filters: {
        name: ''
    },
    listLoading: false,
    editFormVisible: false,//编辑界面是否显示
    editLoading: false,
    editFormRules: {
        name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
    },
    tableData: [{
          date: '2016-05-03',
          name: '科比',
          age:'38',
          address: '洛杉矶湖人'
        }, {
          date: '2016-05-02',
          name: '詹姆斯',
          age:'34',
          address: '克利夫兰骑士'
        }, {
          date: '2016-05-04',
          name: '韦德',
          age:'36',
          address: '迈阿密热火'
        }, {
          date: '2016-05-01',
          name: '乔丹',
          age:'55',
          address: '芝加哥公牛'
        }, {
          date: '2016-05-08',
          name: '易建联',
          age:'35',
          address: '中国广州'
        }, {
          date: '2016-05-06',
          name: '林书豪',
          age:'31',
          address: '北京首钢'
        }, {
          date: '2016-05-07',
          name: '姚明',
          age:'38',
          address: '上海'
        },{
          date: '2016-05-06',
          name: '林书豪',
          age:'31',
          address: '北京首钢'
        }, {
          date: '2016-05-07',
          name: '姚明',
          age:'38',
          address: '上海'
        },{
          date: '2016-05-06',
          name: '林书豪',
          age:'31',
          address: '北京首钢'
        }, {
          date: '2016-05-07',
          name: '姚明',
          age:'38',
          address: '上海'
        },],
        multipleSelection: [],
        editForm: {
            id: 0,
            name: '',
            //sex: -1,
            age: 0,
            date: '',
            address: ''
        },
        currentPage:1,
        totalCount:1000,
        pagesize:10,

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
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        this.currentPage = val;

    },
     handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      getUsers(){
          console.log('getusers')
      },
      handleAdd(){
          console.log('handleAdd')
      },
      handleDel(){
          console.log('handleDel')
      },
     handleEdit: function (index, row) {

        this.editFormVisible = true;
        console.log(this.editFormVisible,111)
        this.editForm = Object.assign({}, row);
    },
    editSubmit(){
        console.log('editSubmit')
        this.editFormVisible = false;
    }
},
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.toolbar {
	background: #fff;
	padding: 10px;
	//border:1px solid #dfe6ec;
	margin: 0 0 10px 0;
	.el-form-item {
		margin-bottom: 10px;
	}
}
.el-pagination{
    background:#fff;
}
.el-table{
    overflow:auto;
    max-height:475px;
}
.el-table::before{
    content:none;
}
</style>
