<template>
    <div id="myChart" :style="{width: '100%', height: '50%'}"></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
components: {},
data() {
//这里存放数据
return {

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
    this.drawLine();
},
//方法集合
methods: {
    drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
            title: {text: ''},
            tooltip: {},
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['2018/12/04', '2018/12/05', '2018/12/06', '2018/12/07', '2018/12/08', '2018/12/09', '2018/12/10','2018/12/11','2018/12/12','2018/12/13', '2018/12/14', '2018/12/15', '2018/12/16', '2018/12/17', '2018/12/18', '2018/12/19','2018/12/20','2018/12/21']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [20000, 30000, 50000, 70000, 60000 ,100000, 130000, 140000,170000,20000, 30000, 50000, 70000, 60000 ,100000, 130000, 140000,170000],
                type: 'line',
                itemStyle: {
                    color: 'rgb(24, 143, 244)'
                },
                areaStyle: {    // 颜色渐变
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{    //$echart 在main.js里面已经写到了
                        offset: 0,
                        color: 'rgb(24, 143, 244)'
                    }, {
                        offset: 1,
                        color: 'rgb(207, 232, 253)'
                    }])
                },
            }]
        });
    },
},
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>
