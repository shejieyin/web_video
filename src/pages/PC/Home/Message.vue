<template>
  <div class="article-edit">
    <div class="content-main container">
      <div class="content-wrapper">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import echarts from "echarts";
export default {
  name: "Message",
  data() {
    return {
      message: "1111",
    };
  },
  mounted() {
      console.log(this.$route.params.id)
      //TODO:获取当前id的message显示在页面上
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
      width: 300px;
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