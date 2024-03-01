<template>
  <div class="video-detail container">
    <Login />
    <div class="handler-wrapper">
      <img
        src="@/assets/image/VideoDetail/star-default.png"
        v-show="!hasCollect"
        @click="onCollect(1)"
        alt
      />
      <img
        src="@/assets/image/VideoDetail/star-active.png"
        v-show="hasCollect"
        @click="onCollect(0)"
        alt
      />
      <img
        src="@/assets/image/VideoDetail/like-default.png"
        v-show="!hasLike"
        @click="onLike(1)"
        alt
      />
      <img
        src="@/assets/image/VideoDetail/like-active.png"
        v-show="hasLike"
        alt
        @click="onLike(0)"
      />
    </div>
    <div>
      <p class="video-title">{{ info.title }}</p>
    </div>
    <div class="video-container">
      <div class="left-container">
        <div id="dplayer"></div>
        <div class="video-bottom-area">
          <span class="play-times">
            <span>{{ info.play_times }}</span
            >次播放量
          </span>
          <span class="play-times">
            <span>{{ info.play_times }}</span
            >个赞
          </span>
          <span class="play-times">
            <span>{{ info.play_times }}</span
            >次收藏
          </span>
          <div class="auther-info rt clear">
            <div class="lf" @click="goHome(info.auther.userId)">
              <img :src="info.auther.photoUrl || $store.state.userAvatar" alt />
            </div>
            <p class="author-name" @click="goHome(info.auther.userId)">
              {{ info.auther.nickName }}
            </p>
            <button
              v-show="!info.auther.hasFollow"
              class="button-primary rt"
              @click="followUser(info.auther.userId)"
            >
              关注
            </button>
            <button
              v-show="info.auther.hasFollow"
              class="button-primary rt"
              @click="followUser(info.auther.userId)"
            >
              取消关注
            </button>
          </div>
        </div>
      </div>
      <div class="right-container">
        <ul class="recommend-list">
          <li
            v-for="(item, index) in recommend_list"
            :key="index"
            :style="{ backgroundImage: `url(${item.image})` }"
          >
            <div class="mask">
              <p>{{ item.name }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom-container">
      <div class="comment">
        <p class="sub-title">评论</p>
        <div class="textarea-wrapper">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4 }"
            placeholder="请输入评论内容"
            v-model="textarea"
          ></el-input>
          <button class="button-default" @click="onReply">提交评论</button>
        </div>
        <div>
          <ul class="reply-list">
            <li v-for="(item, index) in commentList" :key="index">
              <div class="user-wrraper" @click="goHome(item.id)">
                <img :src="item.userPhoto || $store.state.userAvatar" alt />
                <p>{{ item.nickName }}</p>
              </div>
              <div class="reply-data">
                <p>{{ item.replyData }}</p>
                <p class="reply-info">
                  <span>{{ item.timestamp | format_timestamp }}</span>
                  <span
                    class="handle-reply"
                    @click="item.showTextarea = !item.showTextarea"
                    >回复</span
                  >
                  <span class="rt">
                    <i class="icon-good"></i>
                    <span>{{ item.good > 0 ? item.good : "" }}</span>
                    <i class="icon-bad"></i>
                    <span>{{ item.bad > 0 ? item.bad : "" }}</span>
                  </span>
                </p>
              </div>
              <div class="user-reply">
                <ul class="reply-list" v-show="item.replyList.length > 0">
                  <li v-for="(reply, index) in item.replyList" :key="index">
                    <div class="user-wrraper" @click="goHome(reply.id)">
                      <img
                        :src="reply.userPhoto || $store.state.userAvatar"
                        alt
                      />
                      <p>{{ reply.nickName }}</p>
                    </div>
                    <div class="reply-data">
                      <p>@{{ reply.toUser }}：{{ reply.replyData }}</p>
                      <p class="reply-info">
                        <span>{{ reply.timestamp | format_timestamp }}</span>
                        <span
                          class="handle-reply"
                          @click="handleReply(item, reply)"
                          >回复</span
                        >
                        <span class="rt">
                          <i class="icon-good"></i>
                          <span>{{ reply.good > 0 ? reply.good : "" }}</span>
                          <i class="icon-bad"></i>
                          <span>{{ reply.bad > 0 ? reply.bad : "" }}</span>
                        </span>
                      </p>
                    </div>
                  </li>
                </ul>
                <div class="textarea-wrapper" v-show="item.showTextarea">
                  <img :src="user.photoUrl || $store.state.userAvatar" alt />
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2 }"
                    placeholder="请输入回复内容"
                    v-model="item.textarea"
                    @focus="authLogin"
                  ></el-input>
                  <button
                    class="button-default"
                    @click="onReplyUser(item, index)"
                  >
                    提交评论
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="ranking-list">
        <p class="sub-title">排行榜</p>
        <ul>
          <li v-for="(item, index) in ranking_list" :key="index">
            <p>
              <span :class="'rank-index ' + (index <= 2 ? 'active' : '')">{{
                index + 1
              }}</span>
              <span>{{ item.title }}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { Comment, Reply } from "./Comment";
import { mapState } from "vuex";
import Login from "@/components/PC/Login";
import DPlayer from "dplayer";
//播放器文档：http://dplayer.js.org/zh/guide.html#%E5%8F%82%E6%95%B0
export default {
  name: "VideoDetail",
  components: {
    Login,
  },
  computed: {
    ...mapState("Login", ["user"]),
  },
  data() {
    return {
      info: {
        title: "佩奇：你把老师都整蒙圈了！！",
        play_times: 1000,
        bullet_screen: 10000,
        auther: {
          nickName: "天线宝宝",
        },
      },
      timer: null,
      ctx: null,
      dmInput: "",
      dmArr: [],
      gap: 80,
      recommend_list: [],
      ranking_list: [],
      textarea: "",
      commentList: [
        {
          id: "111",
          nickName: "chloe",
          replyData: "lallla",
          good: 100,
          bad: 1,
          showTextarea: false,
          timestamp: 1600670910515,
          replyList: [
            {
              id: "111",
              nickName: "tom",
              toUser: "chloe",
              replyData: "大师兄说的对",
              good: 2,
              bad: 0,
              showTextarea: false,
              textarea: "",
              timestamp: 1600670910515,
            },
          ],
        },
        {
          id: "222",
          nickName: "jeny",
          good: 500,
          bad: 9,
          replyData: "好棒哇哇哇哇哇",
          showTextarea: false,
          replyList: [],
          timestamp: 1600670910515,
        },
      ],
      hasCollect: false,
      hasLike: false,
      reply: {},
    };
  },
  mounted() {
    this.$axios.get("/video/recommend").then((data) => {
      console.log(data);
      this.recommend_list = data.data.rows;
    });
    this.$axios.get("/video/ranking").then((data) => {
      console.log(data);
      this.ranking_list = data.data.rows;
    });
    const dp = new DPlayer({
      container: document.getElementById("dplayer"),
      live: true,
      apiBackend: {
        read: function (options) {
          console.log("Pretend to connect WebSocket");
          options.success([]);
        },
        send: function (options) {
          console.log("Pretend to send danmaku via WebSocket", options.data);
          options.success();
        },
      },
      autoplay: false,
      theme: "#FADFA3",
      loop: true,
      lang: "zh-cn",
      screenshot: true,
      hotkey: true,
      preload: "auto",
      volume: 0.7,
      mutex: true,
      video: {
        url: "./static/1.mp4",
        pic: "./static/main.jpeg",
        thumbnails: "thumbnails.jpg",
        type: "auto",
      },
      subtitle: {
        url: "dplayer.vtt",
        type: "webvtt",
        fontSize: "25px",
        bottom: "10%",
        color: "#b7daff",
      }
    });
  },
  methods: {
    goHome(id) {
      this.$router.push("/home/" + id);
    },
    onReply() {
      //TODO:请求接口，返回评论id，目前写死的1
      let comment = new Comment(1, this.user.nickName, this.textarea);
      this.commentList.unshift(comment);
      this.textarea = "";
    },
    handleReply(item, reply) {
      item.showTextarea = !item.showTextarea;
      this.reply = reply;
    },
    onReplyUser(item, index) {
      //TODO:请求接口，返回评论id，目前写死的1
      let reply = new Reply(
        1,
        this.user.nickName,
        item.textarea,
        this.reply.nickName
      );
      this.commentList[index].replyList.push(reply);
      item.textarea = "";
    },
    onCollect(mode) {
      //验证是否登陆
      if (!this.authLogin()) {
        return false;
      }
      //TODO:请求接口，收藏或取消收藏
      if (mode === 1) {
        this.$axios
          .post(this.$store.state.host + "/collect/add", {
            userId: this.user.userId,
            articleId: this.$route.params.id,
          })
          .then((data) => {
            this.hasCollect = true;
            console.log(data);
            this.$message({
              type: "success",
              message: "收藏成功",
            });
          });
      } else {
        this.$axios
          .post(this.$store.state.host + "/collect/delete", {
            userId: this.user.userId,
            articleId: this.$route.params.id,
          })
          .then((data) => {
            this.hasCollect = false;
            this.$message({
              type: "success",
              message: "取消收藏成功",
            });
            console.log(data);
          });
      }
    },
    onLike(mode) {
      //验证是否登陆
      if (!this.authLogin()) {
        return false;
      }
      //TODO:请求接口，点赞或取消点赞
      if (mode === 1) {
        this.$axios
          .post(this.$store.state.host + "/likelist/like", {
            userId: this.user.userId,
            articleId: this.$route.params.id,
          })
          .then((data) => {
            this.hasLike = !this.hasLike;
            this.$message({
              type: "success",
              message: data.msg,
            });
          });
      } else {
      }
    },
    followUser(tarId) {
      //验证是否登陆
      if (!this.authLogin()) {
        return false;
      }
      // TODO:关注/取消关注
      this.$axios
        .post(this.$store.state.host + "/follow/follow", {
          userId1: this.user.userId,
          userId2: tarId,
        })
        .then((data) => {
          if (data.status === 200 || data.status === 201) {
            this.$message({
              type: "success",
              message: data.msg,
            });
            this.auther.hasFollow = !this.auther.hasFollow;
          } else {
            this.$message.error(data.msg);
          }
        });
    },
    authLogin() {
      if (!this.user.userId) {
        this.$store.dispatch("CHANGE_LOGINSWITCH", true);
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.video-detail {
  padding: 40px 0;
  .handler-wrapper {
    position: fixed;
    left: 0;
    top: 300px;
    img {
      width: 50px;
      background: #fff;
      padding: 15px;
      border-radius: 50%;
      box-shadow: @box-shadow;
      display: block;
      margin: 30px;
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
      width: 880px;
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
              width: 60px;
              height: 60px;
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
      .sub-title {
        padding-left: 20px;
        color: #333333;
      }
      .recommend-list {
        width: 180px;
        padding: 0 20px;
        li {
          width: 180px;
          height: 96px;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 12px;
          background-size: 100% 100%;
          cursor: pointer;
          .mask {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            font-size: 14px;
            position: relative;
            p {
              position: absolute;
              bottom: 0;
              padding: 0 5px;
            }
          }
          &:hover {
            .mask {
              background: rgba(0, 0, 0, 0);
            }
          }
        }
      }
    }
  }
  .bottom-container {
    display: flex;
    justify-content: center;
    margin-top: 12px;
    .ranking-list {
      width: 300px;
      box-sizing: border-box;
      padding-left: 20px;
      font-size: 14px;
      li {
        line-height: 30px;
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
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .comment {
      width: 880px;
      .textarea-wrapper {
        button {
          margin-top: 16px;
        }
      }
    }
    .reply-list {
      margin-top: 20px;
      li {
        padding: 20px 0;
        display: block;
        border-bottom: 1px solid @border-color;
        img {
          width: 60px;
          border-radius: 50%;
        }
        .user-wrraper {
          text-align: center;
          margin-right: 20px;
          cursor: pointer;
        }
        .user-wrraper,
        .reply-data {
          display: inline-block;
          vertical-align: middle;
          color: #666666;
        }
        .reply-data {
          font-size: 14px;
          width: calc(100% - 100px);
          > p:first-child {
            height: 60px;
            padding-top: 10px;
            box-sizing: border-box;
          }
        }
        .reply-info {
          font-size: 12px;
          .handle-reply {
            margin-left: 10px;
            cursor: pointer;
            &:hover {
              color: #00a1d6;
            }
          }
          > span:last-child {
            font-size: 14px;
            line-height: 20px;
          }
        }
        .user-reply {
          padding-left: 80px;
          li {
            padding: 12px 0;
            img {
              width: 40px;
              height: 40px;
            }
            border: 0;
            .reply-data {
              > p:first-child {
                height: 40px;
                padding-top: 10px;
                box-sizing: border-box;
              }
              i {
                width: 16px;
                height: 16px;
              }
            }
          }
        }
        .textarea-wrapper {
          width: 640px;
          margin-top: 20px;
          box-sizing: border-box;
          border-radius: 4px;
          padding: 20px;
          background: #f2f2f2;
          img {
            margin-right: 10px;
            vertical-align: middle;
          }
          .el-textarea {
            width: 400px;
            vertical-align: middle;
          }
          button {
            display: inline-block;
            vertical-align: middle;
            margin: 0 0 0 10px;
          }
        }
      }
    }
  }
  .icon-good {
    .icon("../../../assets/image/VideoDetail/good-default.png",20px,20px);
    margin-left: 10px;
  }
  .icon-bad {
    .icon("../../../assets/image/VideoDetail/bad-default.png",20px,20px);
    margin-left: 10px;
  }
}
</style>