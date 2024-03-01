<template>
  <div class="video-list container">
    <div class="floor clear">
      <div class="left-container">
        <ul v-if="f1_list.length>0">
          <li v-for="(item,index) in f1_list" :key="index">
            <div>
              <div class="video-cover">
                <img :src="item.img" alt @click="goDetail(item)" />
                <div class="video-icon">
                  <i class="icon-play"></i>
                </div>
                <div class="video-info">
                  <i class="icon-play2"></i>
                  <span>{{item.play_times}}</span>
                  <i class="icon-good"></i>
                  <span>{{item.good}}</span>
                  <span>{{item.duration | format_duration}}</span>
                </div>
              </div>
              <p class="video-name" @click="goDetail(item)">{{item.name}}</p>
              <p class="video-author" @click="goHome(item.author.id)">
                <i class="el-icon-upload"></i>
                {{item.author.name}}
              </p>
            </div>
          </li>
        </ul>
        <ul v-else>
          <li v-for="(item,index) in 8" :key="index">
            <BulletListLoader></BulletListLoader>
          </li>
        </ul>
        <Pagination :total="100" :pageSize="12" @changePage="onPageChange"></Pagination>
      </div>
      <div class="right-container">
        <div class="index-title">
          <i class="icon-rank"></i>
          <span>排行榜</span>
          <div class="control rt">
            <button>
              更多
              <i class="el-icon-arrow-right"></i>
            </button>
          </div>
        </div>
        <ul class="ranking-list">
          <li v-for="(item,index) in ranking_list" :key="index" @click="goDetail(item)">
            <p>
              <span :class="'rank-index '+(index<=2?'active':'')">{{index+1}}</span>
              <span>{{item.title}}</span>
            </p>
          </li>
        </ul>
        <el-carousel height="300px" arrow="nerver" indicator-position="outside">
            <el-carousel-item v-for="(item,index) in adList" :key="index">
              <img :src="item" alt="">
            </el-carousel-item>
          </el-carousel>
      </div>
    </div>
  </div>
</template>
<script>
import { BulletListLoader } from "vue-content-loader";
import Pagination from "@/components/PC/Pagination";
export default {
  name: "VideoList",
  components: {
    BulletListLoader,
    Pagination,
  },
  data() {
    return {
      f1_list: [],
      ranking_list: [],
      adList:["./static/ad1.png","./static/ad2.png","./static/ad3.png","./static/ad4.png","./static/ad5.png","./static/ad6.png"]
    };
  },
  mounted() {
    this.onPageChange(1);
    //TODO:获取排行榜数据
    this.$axios.get("/video/ranking").then((data) => {
      console.log(data);
      this.ranking_list = data.data.rows;
    });
  },
  methods: {
    onPageChange(pno) {
      //TODO:获取分页数据
      for (let i = 0; i < 12; i++) {
        this.f1_list.push({
          img: "./static/5.jpg",
          name: "乌克兰体操公主的拳击训练，吃我这一小拳拳！",
          author: { id: 111, name: "乌克兰体操达纳塔" },
          play_times: 1000,
          good: 200,
          duration: 1000,
        });
      }
    },
    goDetail(item) {
      this.$router.push("/video/detail/" + item.id);
    },
    goHome(id) {
      this.$router.push("/home/" + id);
    },
  },
};
</script>
<style lang="less" scoped>
.video-list {
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .icon-play {
    .icon("../../../assets/image/Index/icon_play.png");
  }
  .icon-play2 {
    .icon("../../../assets/image/Index/icon_play2.png");
  }
  .icon-good {
    .icon("../../../assets/image/Index/icon_good.png");
    margin-left: 10px;
  }
  .index-title {
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 10px;
    line-height: 24px;
    span {
      vertical-align: middle;
    }
    .control {
      button {
        margin-right: 10px;
        display: inline-block;
        line-height: 22px;
        border: 1px solid #999;
        color: #505050;
        font-size: 12px;
        padding: 0 10px;
        cursor: pointer;
      }
      .el-icon-refresh {
        margin-right: 5px;
      }
    }
  }
  .floor {
    margin: 40px 0;

    .left-container {
      width: 840px;
      float: left;
    }
    .right-container {
      width: 330px;
      float: right;
    }
    .left-container {
      ul {
        li {
          display: inline-block;
          width: 200px;
          height: 200px;
          margin-right: 10px;
          margin-bottom: 20px;
          img {
            width: 100%;
          }
          .video-cover {
            position: relative;
            color: #fff;
            cursor: pointer;
            &:hover {
              .video-icon {
                display: block;
              }
            }
          }
          .video-icon {
            position: absolute;
            right: 20px;
            bottom: 30px;
            background: rgba(0, 0, 0, 0.7);
            padding: 10px;
            display: none;
            border-radius: 2px;
          }
          .video-info {
            width: 100%;
            box-sizing: border-box;
            position: absolute;
            bottom: 5px;
            padding: 0 10px;
            line-height: 20px;
            span {
              vertical-align: middle;
            }
            i {
              width: 20px;
              height: 20px;
            }
            span:last-child {
              float: right;
              margin-top: 1px;
            }
          }
        }
        .video-name {
          font-size: 14px;
          font-weight: bold;
          padding: 10px 0;
          cursor: pointer;
        }
        .video-author {
          color: #909090;
          cursor: pointer;
        }
      }
    }
    .right-container {
      .control {
        button {
          margin-right: 0;
        }
      }
      .ranking-list {
        font-size: 14px;
        line-height: 40px;
        cursor: pointer;
        .rank-index {
          color: #999;
          display: inline-block;
          width: 24px;
          line-height: 24px;
          text-align: center;
          border-radius: 2px;
          & + span {
            display: inline-block;
            width: calc(100% - 28px);
            vertical-align: top;
            font-weight: bold;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .active {
          background: #00a1d6;
          color: #fff;
        }
      }
    }
  }
}
</style>