<template>
    <div class="orderMessage">
        <h2>基本的vuex计数应用</h2>
        <span style="line-height:50px">count:{{ count }}</span>
        <p>
            <el-button @click="increment">+</el-button>
            <el-button @click="decrement">-</el-button>
        </p>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { mapGetters,mapActions } from 'vuex'

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {
     ...mapGetters([
      'count'
      // ...
    ])
},
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
    ...mapActions([
      'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
      'decrement'
    ])
},
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.orderMessage{
    width:100%;
    height:100%;
}
</style>