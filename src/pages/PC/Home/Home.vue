<template>
  <div class="book-home container">
    <div class="content-main">
      <div class="content-wrapper">
        <div class="user-wrapper">
          <img :src="userInfo.photoUrl || $store.state.userAvatar" class="user-avatar" alt />
          <div class="user-data">
            <p class="nick-name">{{userInfo.nickName}}</p>
            <ul>
              <li>
                <p>{{followList.length}}</p>
                <p>关注</p>
              </li>
              <li>
                <p>{{userInfo.fansNum||0}}</p>
                <p>粉丝</p>
              </li>
              <li>
                <p>{{articleList.length}}</p>
                <p>文章</p>
              </li>
            </ul>
          </div>
          <div v-if="isUserCenter" class="handle-buttons">
            <button class="button-default" @click="goInfo">修改资料</button>
          </div>
          <div v-else class="handle-buttons">
            <button
              v-show="!hasFollow"
              class="button-default"
              @click="followUser(userInfo.id,1)"
            >关注</button>
            <button
              v-show="hasFollow"
              class="button-primary"
              @click="followUser(userInfo.id,0)"
            >取消关注</button>
          </div>
        </div>
        <ul v-if="isUserCenter" class="tab-list">
          <li
            v-for="(item,index) in tabList"
            :key="index"
            :class="index==active?'active':''"
            @click="active=index"
          >{{item.name}}</li>
        </ul>
        <hr v-else />
        <div v-show="active==0">
          <ul class="article-list">
            <li v-for="(item,index) in articleList" @click="goDetail(item.articleId)" :key="index">
              <div>
                <p class="article-title">{{item.articleTitle}}</p>
                <div class="article-content" v-html="item.articleDetails"></div>
                <p>
                  <span>2020-07-22 16:00</span>
                  <span class="rt">
                    <i class="icon-play"></i>
                    <span>{{item.play_times}}</span>
                    <i class="icon-good"></i>
                    <span>{{item.good}}</span>
                    <i class="icon-heart"></i>
                    <span>{{item.like}}</span>
                    <i class="icon-star"></i>
                    <span>{{item.collect}}</span>
                  </span>
                </p>
              </div>
              <span>{{item.author}}</span>
              <img :src="item.photoUrl" alt />
              <span>
                <i class="el-icon-delete" @click.stop="onDelete(item.articleId,index)"></i>
              </span>
            </li>
          </ul>
          <Pagination :total="tabList[0].total" :pageSize="psize" @changePage="getUserArticleList"></Pagination>
          <p v-if="tabList[0].total==0" class="prompt">暂无数据</p>
        </div>
        <div v-show="active==1">
          <ul class="article-list">
            <li v-for="(item,index) in collectList" @click="goDetail(item.articleId)" :key="index">
              <div>
                <p class="article-title">{{item.articleTitle}}</p>
                <div class="article-content" v-html="item.articleDetails"></div>
                <p>
                  <span>2020-07-22 16:00</span>
                  <span class="rt">
                    <i class="icon-play"></i>
                    <span>{{item.play_times}}</span>
                    <i class="icon-good"></i>
                    <span>{{item.good}}</span>
                    <i class="icon-heart"></i>
                    <span>{{item.like}}</span>
                    <i class="icon-star"></i>
                    <span>{{item.collect}}</span>
                  </span>
                </p>
              </div>
              <span>{{item.author}}</span>
              <img :src="item.photoUrl || '../static/img/cover.jpg'" alt />
              <span>
                <i class="el-icon-delete" @click.stop="onDelete(item.articleId,index)"></i>
              </span>
            </li>
          </ul>
          <Pagination :total="tabList[1].total" :pageSize="psize" @changePage="getUserCollectList"></Pagination>
          <p v-if="tabList[1].total==0" class="prompt">暂无数据</p>
        </div>
        <div v-show="active==2">
          <ul class="follow-list">
            <li v-for="(item,index) in followList" @click="goHome(item.userId)" :key="index">
              <img :src="item.photoUrl || $store.state.userAvatar" alt />
              <p>{{item.nickName}}</p>
            </li>
          </ul>
          <p v-if="tabList[2].total==0" class="prompt">暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/PC/Pagination";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: { Pagination },
  data() {
    return {
      options: [
        {
          value: "1",
          label: "未审核",
        },
        {
          value: "2",
          label: "审核通过",
        },
        {
          value: "3",
          label: "审核不通过",
        },
      ],
      value: "全部",
      userInfo: {},
      articleList: [],
      collectList: [],
      followList: [],
      rules: {
        nickName: [
          { required: true, message: "请输入新昵称", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
      tabList: [
        {
          name: "我的点赞",
          total: 0,
        },
        {
          name: "我的收藏",
          total: 0,
        },
        {
          name: "我的关注",
          total: 0,
        },
      ],
      active: 0,
      psize: 8,
      hasFollow:false
    };
  },
  watch: {
    userId() {
      this.active = 0;
    },
  },
  computed: {
    isUserCenter() {
      return true;
    },
    userId(){
      return this.$route.params.id
    },
    ...mapGetters("Login", ["user"]),
  },
  mounted() {
    console.log(this.isUserCenter);
    this.$axios
      .get("/user/queryuser?userId=" +
          this.userId
      )
      .then((data) => {
        this.userInfo = data.data;
      });
    this.getUserArticleList(1);
    this.getUserFollowList(1);
    this.getUserCollectList(1);
  },
  methods: {
    getUserArticleList(pno) {
      // TODO:获取当前页文章列表
      this.$axios
        .get("/list/UserLists?userId=" +
            this.userId +
            "&pno=" +
            pno +
            "&psize=" +
            this.psize
        )
        .then((data) => {
          console.log(data);
          this.articleList = data.data.rows;
          this.tabList[0].total = data.data.total;
        });
    },
    getUserFollowList(pno) {
      this.$axios
        .post("/follow/followlist", {
          userId: this.userId,
          pno: 1,
          psize: 10,
        })
        .then((data) => {
          this.followList = data.data.rows;
          console.log(this.followList);
          this.tabList[2].total = data.data.total;
        });
    },
    getUserCollectList(pno) {
      this.$axios
        .get("/ranking_list", {
          userId: this.userId,
          pno: pno,
          psize: this.psize,
        })
        .then((data) => {
          console.log(data);
          this.collectList = data.data.rows;
          this.tabList[1].total = data.data.total;
        });
    },
    followUser(tarId, mode) {
      // TODO:关注/取消关注
      this.$axios
        .post("/follow/follow", {
          userId1: this.userId,
          userId2: tarId,
        })
        .then((data) => {
          if (data.status === 200 || data.status === 201) {
            this.$message({
              type: "success",
              message: data.msg,
            });
            hasFollow = !hasFollow;
          } else {
            this.$message.error(data.msg);
          }
        });
    },
    goDetail(id) {
      this.$router.push("/video/detail/" + id);
    },
    goHome(id) {
      this.$router.push("/home/" + id);
    },
    goInfo(){
      this.$router.push("/home/info");
    },
    onSave() {
      this.edit = false;
      // TODO：保存昵称
      this.$axios
        .post(this.$store.state.host + "/center/updateUser", {
          userId: this.userInfo.userId,
          nickName: this.userInfo.nickName,
        })
        .then((data) => {
          if (data.code === 200) {
            this.user.nickName = this.userInfo.nickName;
            this.user.photoUrl = this.userInfo.photoUrl;
            this.$store.dispatch("CHANGE_USERINFO", userInfo);
          }
        });
    },
    onDelete(id, index) {
      this.$axios
        .post(this.$store.state.host + "/detail/delArticle", {
          articleId: id,
        })
        .then((data) => {
          if (data.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.articleList.splice(index, 1);
          }
        });
    },
    handleAvatarSuccess(res, file) {
      this.userInfo.photoUrl = URL.createObjectURL(file.raw);
      this.photoUrl = res.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="less" scoped>
.book-home {
  padding: 40px 0;
  i {
    font-size: 20px;
    cursor: pointer;
  }
  .el-select {
    margin-right: 20px;
  }
  .content-wrapper {
    padding: 40px;
    hr {
      margin: 20px 0;
      background: @border-color;
      height: 1px;
      border: none;
    }
    .user-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-right: 24px;
      vertical-align: middle;
    }
    .user-data {
      display: inline-block;
      vertical-align: middle;
      .nick-name {
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 16px;
      }
      ul {
        li {
          display: inline-block;
          border-right: 1px solid @border-color;
          text-align: center;
          padding: 0 10px;
        }
        li:last-child {
          border: none;
        }
      }
    }
    .handle-buttons {
      display: inline-block;
      vertical-align: middle;
      margin-left: 50px;
      button {
        width: 100px;
      }
    }
    .user-wrapper {
      a:last-child {
        line-height: 100px;
      }
    }
  }
  .tab-list {
    margin: 30px 0;
    background: @sub-color;
    border-radius: 6px;
    overflow: hidden;
    .active {
      background: @primary-color;
    }
    li {
      display: inline-block;
      padding: 10px 0;
      width: 33.3%;
      color: #fff;
      text-align: center;
      cursor: pointer;
      &:hover {
        .active;
      }
    }
  }
  .article-list {
    li {
      border-bottom: 1px solid @border-color;
      padding: 24px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      & > div {
        width: 600px;
        height: 100%;
        word-break: break-all;
        p:last-child {
          line-height: 20px;
          margin-top: 10px;
          color: #666;
        }
      }
      img {
        width: 200px;
        border-radius: 6px;
      }
      > span:last-child {
        i {
          margin-right: 10px;
        }
      }
    }
    li:last-child {
      border: none;
      margin-bottom: 20px;
    }
  }
  .follow-list {
    li {
      display: inline-block;
      text-align: center;
      margin-right: 20px;
      cursor: pointer;
      img {
        width: 60px;
      }
    }
  }
  .icon-good {
    .icon("../../../assets/image/Home/good.png",20px,20px);
    margin-left: 10px;
  }
  .icon-heart {
    .icon("../../../assets/image/Home/heart.png",20px,20px);
    margin-left: 10px;
  }
  .icon-star {
    .icon("../../../assets/image/Home/star.png",20px,20px);
    margin-left: 10px;
  }
  .icon-play {
    .icon("../../../assets/image/Home/play.png",20px,20px);
    margin-left: 10px;
  }
}
</style>
<style>
.book-home .avatar-uploader {
  display: inline-block;
  vertical-align: middle;
  margin-right: 24px;
}
.book-home .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.book-home .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.book-home .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.book-home .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>