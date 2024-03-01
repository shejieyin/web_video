<template>
  <div class="book-home container">
    <div class="content-main">
      <div class="content-wrapper">
        <div>
          <span class="home-title">我的视频</span>
          <button class="button-primary rt" @click="goPublish">去发布视频</button>
        </div>
        <ul class="tab-list">
          <li
            v-for="(item,index) in tabList"
            :key="index"
            :class="index==active?'active':''"
            @click="onTabChange(index)"
          >{{item.name}}</li>
        </ul>
        <div v-show="active==0">
          <ul class="article-list">
            <li v-for="(item,index) in articleList" :key="index">
              <div>
                <p class="article-title">{{item.articleTitle}}</p>
                <div class="article-content" v-html="item.articleDetails"></div>
                <p>
                  <span>{{item.author}}</span>
                  <span>2023-07-22 16:00</span>
                </p>
              </div>
              <span>
                <i class="el-icon-edit-outline" @click.stop="goEdit(item.articleId)"></i>
                <i class="el-icon-delete" @click.stop="onDelete(item.articleId,index)"></i>
              </span>
            </li>
          </ul>
          <Pagination :total="tabList[0].total" :pageSize="psize" @changePage="getUserArticleList"></Pagination>
          <p v-if="tabList[0].total==0" class="prompt">暂无数据</p>
        </div>
        <div v-show="active==1">
          <ul class="article-list">
            <li v-for="(item,index) in articleList" :key="index">
              <div>
                <p class="article-title">{{item.articleTitle}}</p>
                <div class="article-content" v-html="item.articleDetails"></div>
                <p>
                  <span>{{item.author}}</span>
                  <span>2020-07-22 16:00</span>
                </p>
              </div>
              <span>{{item.status|status_enum}}</span>
              <img :src="item.photoUrl" alt />
              <span>
                <i class="el-icon-edit-outline" @click.stop="goEdit(item.articleId)"></i>
                <i class="el-icon-delete" @click.stop="onDelete(item.articleId,index)"></i>
              </span>
            </li>
          </ul>
          <Pagination :total="tabList[1].total" :pageSize="psize" @changePage="getUserCollectList"></Pagination>
          <p v-if="tabList[1].total==0" class="prompt">暂无数据</p>
        </div>
        <div v-show="active==2">
          <ul class="article-list">
            <li v-for="(item,index) in articleList" :key="index">
              <div>
                <p class="article-title">{{item.articleTitle}}</p>
                <div class="article-content" v-html="item.articleDetails"></div>
                <p>
                  <span>{{item.author}}</span>
                  <span>2023-07-22 16:00</span>
                </p>
              </div>
              <span>{{item.status|status_enum}}</span>
              <img :src="item.photoUrl" alt />
              <span>
                <i class="el-icon-edit-outline" @click.stop="goEdit(item.articleId)"></i>
                <i class="el-icon-delete" @click.stop="onDelete(item.articleId,index)"></i>
              </span>
            </li>
          </ul>
          <Pagination :total="tabList[1].total" :pageSize="psize" @changePage="getUserCollectList"></Pagination>
          <p v-if="tabList[2].total==0" class="prompt">暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/PC/Pagination";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: { Pagination },
  data() {
    return {
      userInfo: {},
      articleList: [[],[],[]],
      edit: false,
      tabList: [
        {
          name: "待审核",
          total: 0,
        },
        {
          name: "审核通过",
          total: 0,
        },
        {
          name: "审核不通过",
          total: 0,
        },
      ],
      active: 0,
      psize: 8,
    };
  },
  watch: {
    userId() {
      this.active = 0;
    },
  },
  computed: {
    isUserCenter() {
      return this.userId && this.userId === this.$route.params.id;
    },
    userId() {
      return this.$route.params.id;
    },
    ...mapState("Login", ["user"]),
  },
  mounted() {
    this.getUserArticleList(1,1);
  },
  methods: {
    onTabChange(index){
        this.active=index
        console.log(this.articleList[this.active])
        if(this.articleList[this.active].length===0){
            this.getUserArticleList(1,index+1)
        }
    },
    goPublish() {
      this.$router.push("/video/publish");
    },
    getUserArticleList(pno,status) {
      // TODO:获取当前页文章列表
      this.$axios
        .get("/list/UserLists?userId=" +
            this.$route.params.id +
            "&pno=" +
            pno +
            "&psize=" +
            this.psize+
            "&status="+status
        )
        .then((data) => {
          console.log(data);
          this.articleList = data.data.rows;
          this.tabList[0].total = data.data.total;
        });
    },
    onEdit() {
      this.edit = true;
    },
    goEdit(id) {
      this.$router.push("/video/edit/" + id);
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
    handleClose(done) {
      done();
    }
  },
};
</script>

<style lang="less" scoped>
.book-home {
  padding: 40px 0;
  .home-title{
    font-size: 18px;
    font-weight: bold;
    line-height: 40px;
  }
  i {
    font-size: 20px;
    cursor: pointer;
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