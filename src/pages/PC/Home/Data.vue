<template>
  <div class="article-edit">
    <div class="content-main container">
      <div class="content-wrapper">
        <el-card>
        <p class="data-title">视频数据</p>
        <ul class="datalist">
          <li v-for="(item,index) in datalist" :key="index">
            <p>{{item.name}}</p>
            <p>{{item.count}}</p>
            <p>昨天：{{item.yesterday}}</p>
          </li>
        </ul>
        </el-card> 
        <el-card>
        <p  class="data-title">数据趋势</p>
          <el-card class="card">
            <p  class="data-title">视频播放量TOP 10</p>
            <div class="chart_wrapper" id="video_sum"></div>
          </el-card>
          <el-card class="card">
            <p  class="data-title">视频播放时长TOP 10</p>
            <div class="chart_wrapper" id="video_time"></div>
          </el-card>
          <!-- </el-tab-pane>
        </el-tabs> -->
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Data",
  data() {
    return {
      activeName: "0",
      datalist: [
        { name: "视频播放", count: 100, yesterday: 30 },
        { name: "评论数", count: 100, yesterday: 30 },
        { name: "点赞数", count: 100, yesterday: 30 },
        { name: "收藏数", count: 100, yesterday: 30 },
      ],
      tablist: [
        { tag: "搞笑", data: [820, 932, 901, 934, 1290, 1330, 1320] },
        { tag: "科幻", data: [820, 932, 901, 934, 1290, 1330, 1320] },
        { tag: "游戏", data: [820, 932, 901, 934, 1290, 1330, 1320] },
        { tag: "体育", data: [820, 932, 901, 934, 1290, 1330, 1320] },
        { tag: "音乐", data: [820, 932, 901, 934, 1290, 1330, 1320] },
      ],
      x_data:[],
      y_data:[],
      x_time:[],
      y_time: []
    };
  },
  mounted() {
    // this.getHbase()
  },
  methods: {
    // getHbase方法主要是用来做接口请求的案例。每一个参数的作用和使用方法，你可以完全参考来完成
    getHbase(){
      // this.$axios({
      //   method: '方法',
      //   url: '接口地址' + 'id/' + aaaaaa,
      //   对应post：data:{
      //     a:1,
      //     b:3
      //   }
      //   对应get： params{

      //   }
      // })
      this.$axios({
        method: 'get',
        url:'/video/hbase', //因为使用的axios，这个地方你直接写接口名字就行。不需要带上服务器地址
        params:{}
      }).then((res)=>{
        console.log(res)
        if(res.code === 200){
          this.x_data =  res.data.counts_x_data
          this.y_data = res.data.counts_y_data
          this.x_time = res.data.time_x_data
          this.y_time = res.data.time_y_data
          this.getLine()
          this.getTimeline()
        }else{
          this.$message({
            message: '获取数据失败',
            type:'warning'
          })
        } 
      })
    },
    getLine(){
      let option ={
        tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          },
          formatter: '{b} : 播放{c}次'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
          type: "category",
          data: this.x_data,
        },
        yAxis: {
          type: "value",
          axisLabel: {
              formatter: '{value} 次'
          },
        },
        series: [{
            data: this.y_data,
            type: 'bar'
        }],
      }
      let myChart = this.$echarts.init(document.getElementById("video_sum"));
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
    },
    getTimeline(){
      let option ={
        // title: {
        //     text: '视频播放时长TOP10',
        //     subtext: '副标题文本,支持用\n换行'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          },
          formatter: '{b} : 播放{c}秒'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
          type: "category",
          data: this.x_time,
        },
        yAxis: {
          type: "value",
          axisLabel: {
              formatter: '{value} 秒'
          },
        },
        series: [{
            data: this.y_time,
            type: 'bar'
        }],
      }
      let myChart = this.$echarts.init(document.getElementById("video_time"));
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
    }
  },
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
    width: 100%;
    height:300px;
  }
}
</style>