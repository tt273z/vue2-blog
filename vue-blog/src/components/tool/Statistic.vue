<template>
  <el-row :gutter="20" class="statistic">
    <el-col :span="12" v-margin:bottom="20">
      <el-card>
        <div v-full ref="line">

        </div>
      </el-card>
    </el-col>
    <el-col :span="12" v-margin:bottom="20">
      <el-card>

      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card>

      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import http from "@/api"
import echarts from "echarts";
export default {
  data(){
    return {
      
    }
  },
  mounted(){
    this.initLineChart()
  },
  methods: {
    initLineChart(){
      console.log(this.$refs.line.$el)
      let chart = echarts.init(this.$refs.line); 
      chart.setOption({
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: 'pv',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
        }, {
          name: 'comment',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    }
  }
}
</script>
<style lang="scss">
.statistic {
  height: 100%;
  .el-col {
    height: calc(50% - 10px);
  }
  .el-card {
    height: 100%;
  }
  .el-card__body { 
    padding: 0; 
    width: 100%;
    height: 100%;
  }
}
</style>
