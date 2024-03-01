<template>
  <div class="article-edit">
    <div class="content-main container">
      <div class="content-wrapper">
        <p class="data-title">视频数据</p>
        <ul class="datalist">
          <li v-for="(item,index) in datalist" :key="index">
            <p>{{item.name}}</p>
            <p>{{item.count}}</p>
            <p>昨天：{{item.yesterday}}</p>
          </li>
        </ul>
        <p class="data-title">数据趋势</p>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane
            v-for="(item,index) in tablist"
            :key="index"
            :label="item.tag"
            :name="index+''"
          >
            <div class="chart_wrapper" :id="'chart_wrapper'+index"></div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import echarts from "echarts";
export default {
  name: "Data",
  data() {
    return {
      activeName: "0",
      datalist: [
        { name: "视频播放", count: 100, yesterday: 30 },
        { name: "评论数", count: 100, yesterday: 30 },
        // { name: "弹幕数", count: 100, yesterday: 30 },
        { name: "点赞数", count: 100, yesterday: 30 },
        // { name: "分享数", count: 100, yesterday: 30 },
        { name: "收藏数", count: 100, yesterday: 30 },
      ],
      tablist: [
        { tag: "搞笑", data: [820, 932, 901, 934, 1290, 1330, 1320] },
        { tag: "科幻", data: [820, 932, 901, 934, 1290, 1330, 1320] },
        { tag: "游戏", data: [820, 932, 901, 934, 1290, 1330, 1320] },
        { tag: "体育", data: [820, 932, 901, 934, 1290, 1330, 1320] },
        { tag: "音乐", data: [820, 932, 901, 934, 1290, 1330, 1320] },
      ],
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
          },
        ],
      },
    };
  },
  mounted() {
    for (let i = 0; i < this.tablist.length; i++) {
      let myChart = echarts.init(document.getElementById("chart_wrapper" + i));
      myChart.setOption(this.option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    }
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.article-edit {
  padding: 40px 0;
  .data-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 40px;
  }
  .datalist {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    li {
      display: inline-block;
      width: 260px;
      height: 100px;
      background: rgb(242, 247, 251);
      border-radius: 4px;
      margin-bottom: 40px;
      color: #666;
      box-sizing: border-box;
      padding: 16px 20px;
      p:first-child {
        font-size: 14px;
        & + p {
          font-size: 24px;
          font-weight: bold;
          line-height: 32px;
          color: skyblue;
        }
      }
    }
  }
  .content-wrapper {
    padding: 60px 40px 40px 40px;
  }
  .chart_wrapper {
    width: 600px;
    height: 500px;
  }
}
</style>