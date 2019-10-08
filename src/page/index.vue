<template>
    <div style="width:100%; height:100%; overflow-y:auto; overflow-x:auto; ">
        <el-row :style="{width: '50%', height: '100%'}">
            <div id="myChart2" :style="{width: '100%', height: '50%'}"></div>
            <div id="myChart" :style="{width: '100%', height: '50%'}"></div>
        </el-row>
        <el-row :style="{width: '100%', height: '100%'}">
            <div id="myChart3" :style="{width: '100%', height: '50%'}"></div>
        </el-row>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
components: {},
data() {
//这里存放数据
return {
    monthNumber: [1,2,3,4,5,6,7,8,9,10,11,12], // 月份
    monthRevenue: [500,8000,10000,2222,3333,4444,5222,666,777,888,908,1555] // 每个月对应得值
};
},
//监听属性 类似于data概念
computed: {
    monthNumberLabel: function () {
        let result = [];
        if ( this .monthNumber) {
            this .monthNumber.forEach(x => {
                result.push(x + "月" );
            });
        }
        return result;
    }
},
//监控data中的数据变化
watch: {},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.drawLine();
    this.drawLine2();
    this.drawLine3();
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
    drawLine2() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart2'));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: "item"
                // formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            color: [ "#32CD32" , "#63B8FF" , " #EE4000" ],
            legend: {
                bottom: 10 ,
                left: "center" ,
                data: [ "总收入" , "总支出" , "收支差额" ]
            },
            series: [
                {
                    type: "pie" ,
                    radius: "65%" ,
                    center: [ "50%" , "50%" ],
                    selectedMode: "single" ,
                    label: {
                        normal: {
                            position: "inner" ,
                            // show: false,
                            formatter: "￥{c}" //自定义显示格式(b:name, c:value, d:百分比)
                        }
                    },
                    data: [
                        { value: 11000, name: "总收入" },
                        {value: 25000, name: "总支出" },
                        {value: 36500, name: "收支差额" }
                    ]
                }
            ]
    });
    },
    drawLine3() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart3'));
        // 绘制图表
        myChart.setOption({
            title: { text: "" ,
                subtext: ""
            },
            tooltip: { show: true },
            //grid 区域是否包含坐标轴的刻度标签
            // grid: { left: "1%", right: "1%", bottom: "4%", containLabel: true },
            xAxis: {
                type: "category" ,
                name: "月份" ,
                data: this .monthNumberLabel
            },
            yAxis: {
                type: "value" ,
                splitLine: { show: false }, //改设置不显示坐标区域内的y轴分割线
                name: "收入（元）"
                // data:this.monthRevenue
            },
            series: [
                {
                    type: "bar" ,
                    itemStyle: {
                        normal: { color: "#409eff" }
                    },
                    emphasis: {
                        shadowBlur: 40 ,
                        shadowOffsetX: 10 ,
                        shadowColor: "#409eff"
                    },
                    data: this.monthRevenue
                } ],
            label: {
                //以下为是否显示，显示位置和显示格式的设置了
                show: true , //开启显示
                position: "top" , //在上方显示
                formatter: "￥{c}" ,
                textStyle: {
                    //数值样式
                    color: "red" ,
                    fontSize: 16
                }
            }
        });
    },
},
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>
