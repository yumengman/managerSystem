<template>
    <div class="statistical" ref="statistical">
         <div id="dataSt" class="dataSt"> 
            <!-- <el-row :gutter="20"> 
                <el-col :span="12" style="height:100%;">
                    <div id="dataSt"></div> 
                </el-col>
                <el-col :span="12" style="height:100%;">
                    <div id="dataSt2"></div> 
                </el-col>
            </el-row> -->
        </div> 
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import echarts from 'echarts';
import '../../../node_modules/echarts/theme/macarons.js';

export default {
    name:'dataStatistical',
//import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
    //这里存放数据
        return {
            chart:null,
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
    mounted(){
        // this.drawLine();
        // window.addEventListener('resize',()=>{
        //     myChart.resize()
        // })

         this.$nextTick(function() {
            
                this.$refs.statistical.style.height = (document.body.clientHeight - 160)+'px'
                this.drawLine('dataSt');
               
                var that = this;
                var resizeTimer = null;
                // 保证页面在放大或缩小时，也能够动态的显示数据
                window.onresize = function() {
                    if (resizeTimer) clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(function() {
                        that.$refs.statistical.style.height = (document.body.clientHeight - 160)+'px'
                        that.drawLine('dataSt');
                        
                    }, 500);
                  
                }
            })
    },
    //方法集合
    methods: {
        drawLine(id){
            if ( this.chart &&  this.chart.dispose) { 
                this.chart.dispose(); 
            } 
            // 基于准备好的dom，初始化echarts实例
            this.chart = this.$echarts.init(document.getElementById(id),'macarons')
            // 绘制图表
            this.chart.setOption({
                title: { text: '在Vue中使用echarts' },
                tooltip: {},
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
           
        },
        // drawbar(id){
        //     if ( this.chart_bar &&  this.chart_bar.dispose) { 
        //         this.chart_bar.dispose(); 
        //     } 
        //     // 基于准备好的dom，初始化echarts实例
        //     this.chart_bar = this.$echarts.init(document.getElementById(id),'macarons')
        //     // 绘制图表
        //     this.chart_bar.setOption({
        //         title: { text: '在Vue中使用echarts' },
        //         tooltip: {},
        //         xAxis: {
        //             data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        //         },
        //         yAxis: {},
        //         series: [{
        //             name: '销量',
        //             type: 'bar',
        //             data: [5, 20, 36, 10, 10, 20]
        //         }]
        //     });
           
        // }
    },
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.statistical{
    width:100%;
    height:100%;
    
}
.dataSt{
    height:100%;
    box-shadow: 0 0 10px rgb(55, 192, 247);
    border-radius: 10px;
    padding:10px;
}
// #dataSt,#dataSt2 {
//     position: relative;
//     width: 96%;
//     height: 570px;
//     padding: 10px;
//     box-shadow: 0 0 10px rgb(55, 192, 247);
//     border-radius: 10px;
// }	
</style>