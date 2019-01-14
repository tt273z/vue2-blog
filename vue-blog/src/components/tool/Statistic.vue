<template>
  <el-row
    :gutter="20"
    class="statistic"
  >
    <el-col
      :span="12"
      v-margin:bottom="20"
    >
      <el-card>
        <div
          v-full
          ref="line"
        >

        </div>
      </el-card>
    </el-col>
    <el-col
      :span="12"
      v-margin:bottom="20"
    >
      <el-card>
        <div
          v-full
          ref="word"
        ></div>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card>

      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import http from "@/api";
import echarts from "echarts";
import "echarts-wordcloud";
export default {
  data() {
    return {};
  },
  mounted() {
    http.getYearPvStatistics().then(({ data }) => {
      this.initLineChart(data);
    });
    http.getTagsWordCloud().then(({ data }) => {
      this.initWordCloud(data);
    });
  },
  methods: {
    initLineChart(data) {
      let chart = echarts.init(this.$refs.line);
      chart.setOption({
        title: {
          text: '本年度文章发表/浏览/评论趋势图',
          x: 'center',
          y: 10
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          data: data.map(e => e.month)
        },
        yAxis: {},
        series: [
          {
            name: "发表数",
            type: "line",
            // smooth: true,
            symbol: 'none',
            data: data.map(e => e.pno)
          }, {
            name: "浏览数",
            type: "line",
            // smooth: true,
            symbol: 'none',
            data: data.map(e => e.pv)
          }, {
            name: "评论数",
            type: "line",
            // smooth: true,
            symbol: 'none',
            data: data.map(e => e.com)
          }
        ]
      });
    },
    initWordCloud(data) {
      let chart = echarts.init(this.$refs.word);
      chart.setOption({
        title:{
          text: '文章标签字符云',
          x: 'center',
          y: 10
        },
        tooltip:{
          trigger: 'item'
        },
        series: [
          {
            type: "wordCloud",
            shape: "circle",
            textStyle: {
              normal: {
                fontFamily: "sans-serif",
                // fontWeight: "bold",
                // Color can be a callback function or a color string
                color: function() {
                  // Random color
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160)
                    ].join(",") +
                    ")"
                  );
                }
              },
              emphasis: {
                shadowColor: "#333"
              }
            },
            data: data
          }
        ]
      });
    }
  }
};
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
