<template>
  <div>

 <div class="player">
      <el-row :gutter="10">
        <el-col :xs="3" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="left">这里可以放你想展示的内容，考虑到界面的整洁，这一部分非必需</div>
        </el-col>
        // 下面的模块用于展示直播内容，依旧用Layout做适配
        <el-col :xs="18" :sm="16" :md="16" :lg="16" :xl="16">
          <el-card class="card" shadow="hover">
            <div class="onlineT">
              <!-- 这里应用的是Element的头像组件，直接对应src放上对应的图片地址即可 -->
              <el-avatar src=""></el-avatar> 
               <!-- 以下所有的展示信息都可自定义，只需改变图标和文字描述，当然对应展示的内容是动态获取的 -->
              <el-tag class="online-tag" size="mini" type="warning">直播中</el-tag>
              <p>一起来体验游戏的魅力</p>
              <i class="el-icon-share">分享</i>
              <i class="el-icon-warning">举报</i>
              <i class="el-icon-s-custom">粉丝 {{fansNum}}万</i>
            </div>
            <div class="line-two">
              <el-tag class="online-lv" effect="dark" size="mini" type="danger">LV 89</el-tag>
              <p>Barry</p>
              <i class="el-icon-present">{{presentNum}}</i>
              <i class="el-icon-star-on">收藏</i>
              <i class="el-icon-video-camera-solid">回放</i>
              <i class="el-icon-s-flag">粉丝群</i>
              <i class="el-icon-s-data">数据</i>
            </div>
          </el-card>
          <div style="height:80%">
          <!-- 这是播放器，后面我们会详细讲解 -->
            <video-player
              class="video-player vjs-custom-skin"
              ref="videoPlayer"
              :playsinline="false"
              :options="playerOptions"
              @play="onPlayerPlay($event)"
              @pause="onPlayerPause($event)"
            ></video-player>
          </div>
        </el-col>
        <el-col :xs="3" :sm="4" :md="4" :lg="4" :xl="4">
          <div>这里可放置内容，也可占空位</div>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top:40px">
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
          <el-card shadow="always">
          <!-- 这里用到tabs组件，分别展示主播简介和生活动态 -->
          <!-- 组件使用较为简单，具体详情也可直接了解element官网 -->
            <el-tabs type="border-card">
              <el-tab-pane>
                <span slot="label">
                  <i class="el-icon-user-solid">主播简介</i>
                </span>
                这里是主播的的介绍，
                <br />吃鸡、王者、战地、CS样样精通
                <br />个人获得各个赛区的冠军
                <br />每晚8：00准时开播
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label">
                  <i class="el-icon-trophy-1">个人动态</i>
                </span>
                <ul>
                  <li>
                  //可用于类似朋友圈信息展示
                    <p style="font-size:16px;color:red;padding-bottom:10px">今天天气真不错</p>
                    <img src="图片地址" alt="动态图片">
                  </li>
                  <hr>
                  <li>
                    <p style="font-size:16px;color:red;padding-bottom:10px">努力登顶</p>
                    <img src="图片地址" alt="登顶">
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import DPlayer from "dplayer";
// import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
export default {
  name: "online",
  data() {
    return {
      fans:10000,
      src:'',
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
            src:"" //你的m3u8地址（必填）
          }
        ],
        poster: "poster.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  components: {
    videoPlayer
  },

  mounted() {
    this.onPlayerPlay();
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    onPlayerPlay(player) {
      console.log("play");
      this.$refs.videoPlayer.player.play();
    },
    onPlayerPause(player) {
      console.log("pause");
    }
  }
};
</script>
<style lang="less" scoped>
.player {
  background: url("../../../assets/image/onlineB.png") no-repeat;
  background-size: 100% 100%; //让图片全部展开 铺满整个区域 图片不满的情况
}
.card {
  background-color: transparent;
  // border: transparent;
  border-radius: 20px;
}
.onlineT {
  width: 100%;
  color: #f2f2f2;
  padding-left: 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .online-tag {
    margin-left: 40px;
    size: 5px;
  }
  .el-icon-share {
    font-size: 14px;
    float: right;
  }
  .el-icon-warning {
    font-size: 14px;
    float: right;
    padding-right: 10px;
  }
  .el-icon-s-custom {
    font-size: 14px;
    float: right;
    padding-right: 10px;
  }
  .el-icon-video-play {
    content: "\E7C0";
    font-size: 30px;
    color: aqua;
    margin-left: 40px;
  }
  p {
    font-size: 18px;
    font-weight: bold;
    padding: 0 0 0 20px;
    color: rgb(231, 157, 18);
    display: inline-block;
  }
}
.line-two {
  width: 500px;
  color: #f2f2f2;
  padding: 10px 10px 0 100px;

  p {
    display: inline-block;
    font-size: 10px;
    margin-left: 6%;
  }
  i {
    font-size: 17px;
    font-weight: bolder;
    margin-left: 10px;
  }
  .el-icon-present {
    font-size: 17px;
    font-weight: bolder;
    margin-left: 10px;
    color: #f56c6c;
  }
  .el-icon-star-on {
    color: greenyellow;
  }
  .el-icon-video-camera-solid {
    color: cadetblue;
  }
  .el-icon-s-flag {
    color: #f56c6c;
  }
  .el-icon-s-data {
    color: blue;
  }
}
</style>