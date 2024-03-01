<template>
  <div>
    <div class="player">
      <!-- gutter用于间隔列距 -->
    <el-row :gutter="10">
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="6">
        <div class="left">1</div>
      </el-col>
      <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="12">
        <div class="wenzi">
          <p @click="goOnline">进入直播间</p>
        </div>
        <!-- 播放的实现采用组件 -videojs -->
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          style="height:100%"
        ></video-player>
      </el-col>
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="6">
        <div class="right-ul">
          <ul>
            <li
              v-for="(item,index) in recommend_list"
              :key="index"
              :style="{backgroundImage:`url(${item.cover_url})`}"
            >
              <div class="mask">
                <p>{{item.title}}</p>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</div>
  
</template>
<script>
import DPlayer from "dplayer";
// import "video.js/dist/video-js.css";
// 引入vue-video-player
import { videoPlayer } from "vue-video-player";
//播放器文档：http://dplayer.js.org/zh/guide.html#%E5%8F%82%E6%95%B0
export default {
  name: "online",
  data() {
    return {
      recommend_list: [],
      playerOptions: {
        //  playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "application/x-mpegURL",
            src: "" //你的m3u8地址（必填）
          }
        ],
        poster: "poster.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true, //是否显示剩余时间
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  // 子父组件的申明
  components: {
    videoPlayer
  },

  mounted() {
    // 当用户点击直播进入列表时 就开始播放在直播的视频
    // this.onPlayerPlay();
    // this.getOnlineR();
  },
  //   computed: {
  //     player() {
  //         console.log('这个时候事件触发了')
  //       return this.$refs.videoPlayer.player;
  //     }
  //   },
  methods: {
    onPlayerPlay(player) {
      console.log("play");
      this.$refs.videoPlayer.player.play();
    },
    onPlayerPause(player) {
      console.log("pause");
    },
    goOnline() {
      this.$router.push("/video/online/");
    },
    getOnlineR() {
      this.$axios({
        method: "get",
        url: "/video/related/" + window.localStorage.video_id
      }).then(res => {
        console.log("++++++P+_+_");
        console.log(res);
        if (res.code === 200) {
          this.recommend_list = res.data;
          console.log(this.recommend_list.splice(1, 1));
        } else {
          this.$message.error("推介视频获取失败");
          this.recommend_list = [];
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.player {
  // margin-top: 5px;
  background: url("../../../assets/image/onlineB.png") no-repeat;
  background-size: 100% 100%; //让图片全部展开 铺满整个区域 图片不满的情况
  .wenzi {
    width: 200px;
    height: 300px;
    position: absolute;
    left: 48%;
    top: 48%;
    p {
      color: #298ce9;
      font-size: 19px;
      position: absolute;
      z-index: 9999;
      font-weight: bolder;
      opacity: 0; //透明度
      cursor: pointer;
    }
  }
  .wenzi:hover p {
    z-index: 9999;
    opacity: 1;
  }
}
.two-line {
  margin: 10px;
  position: absolute;
  cursor: pointer;
}
.right-ul {
  width: 80%;
  height: 550px;
  background-color: #fff;
  margin-left: 10%;
  background-color: transparent;
  position: relative;
  li {
    height: 125px;
    margin-top: 14px;
    color: #fff;
    border:blue 1px;
    img {
      width: 100%;
      height: 110px;
    }
    .mask {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      font-size: 14px;
      position: relative;
    //   opacity: 0.1;
      p {
        position: absolute;
        bottom: 0;
        padding: 0 5px;
        font-weight: bolder;
      }
    }
    &:hover {
      .mask {
        background: rgba(0, 0, 0, 0);
        cursor: pointer;
        // opacity: 0.9;
      }
    }
  }
}
.icon-play {
  .icon("../../../assets/image/Index/icon_play.png");
}
.video-detail {
  padding: 40px 0;
  background: url("https://assets.codepen.io/2002878/bilibili-winter-view-2.jpg")
    no-repeat center center;
  .handler-wrapper {
    position: fixed;
    right: 0;
    top: 300px;
    img {
      width: 50px;
      background: #fff;
      padding: 15px;
      border-radius: 50%;
      box-shadow: @box-shadow;
      display: block;
      margin: 30px;
      cursor: pointer;
    }
  }
  .sub-title {
    font-size: 16px;
    font-weight: bold;
    padding: 5px 0;
  }
  .video-title {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 20px;
  }
  .video-container {
    display: flex;
    justify-content: center;
    .left-container {
      width: 2000px;
      position: relative;
      box-shadow: 0 0 8px #e5e9ef;
      video {
        width: 100%;
        height: 440px;
        border: 0;
        background: #000;
      }
      #canvas {
        position: absolute;
        left: 0;
        top: 0;
      }
      .video-bottom-area {
        padding: 20px;
        .auther-info {
          width: 140px;
          > div:first-child {
            text-align: center;
            img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
          }
          .author-name {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 8px;
            text-align: center;
          }
          button {
            height: 28px;
            line-height: 28px;
          }
        }
        .play-times {
          line-height: 60px;
          margin-left: 20px;
          color: #707070;
          font-size: 16px;
          span {
            margin-right: 5px;
          }
        }
        .bullet-input {
          margin-bottom: 20px;
          padding-top: 10px;
          .el-input {
            width: 360px;
          }
          p {
            cursor: pointer;
          }
        }
      }
    }
    .right-container {
      width: 300px;
      color: #f2f2f2;
      padding-left: 20px;
      p {
        font-size: 14px;
        font-weight: bold;
        padding: 10px 0 0 0px;
        color: black;
        display: inline-block;
      }
      .sub-title {
        padding-left: 20px;
        color: #333333;
      }
      .recommend-list {
        width: 180px;
        padding: 0 20px;
        li {
          width: 200px;
          height: 120px;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 12px;
          background-size: 100% 100%;
          cursor: pointer;
          margin: 10px;
          white-space: pre-line;
          .mask {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            font-size: 14px;
            position: relative;
            // opacity: 0.1;
            p {
              position: absolute;
              bottom: 0;
              padding: 0 5px;
              color: white;
            }
          }
          &:hover {
            .mask {
              background: rgba(0, 0, 0, 0);
              // opacity: 0.9;
            }
          }
        }
      }
    }
  }
}
</style>