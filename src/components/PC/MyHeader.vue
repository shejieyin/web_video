<template>
  <div class="book-header">
    <div class="content-main">
      <div class="logo" @click="goIndex">
        <img src="@/assets/image/logo.png" alt />
        <span>Cultural video community</span>
      </div>
      <ul>
        <router-link
          v-for="(item, index) in routeList"
          :to="item.path"
          :key="index"
        >
          <li :class="index == active ? 'active' : ''" @click="active = index">
            <i v-show="index == active" :class="item.acticeIcon"></i>
            <i v-show="index != active" :class="item.defaultIcon"></i>
            <span class="router-item">{{ item.name }}</span>
          </li>
        </router-link>
      </ul>
      <div class="search-wrapper" @keyup.enter="onSearch">
        <input
          type="text"
          v-model="keyword"
          placeholder="歪嘴战神演甜剧？骗狗杀啦！"
        />
        <i class="icon-search" @click="onSearch"></i>
      </div>
      <div class="user-wrapper rt" v-if="user.user_id">
        <el-dropdown trigger="click">
          <div>
            <img
              :src="user.avatar_url || $store.state.userAvatar"
              :onerror="$store.state.defaultAvatar"
              alt
            />
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix" @click.native="goHome"
              >个人中心</el-dropdown-item
            >
            <el-dropdown-item class="clearfix" @click.native="goAdmin"
              >创作中心</el-dropdown-item
            >
            <el-dropdown-item class="clearfix" @click.native="goOnline"
            >发起直播</el-dropdown-item
            >
            <el-dropdown-item class="clearfix" @click.native="goData"
              >数据中心</el-dropdown-item
            >
            <el-dropdown-item class="clearfix" @click.native="goInfo"
              >我的资料</el-dropdown-item
            >
            <el-dropdown-item class="clearfix" @click.native="goPublic"
              >发布视频</el-dropdown-item
            >
            <el-dropdown-item class="clearfix" @click.native="onLogout"
              >退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <span @click="goHome">{{ user.nickname }}</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-badge :value="num" :max="99" class="item" v-show="num > 0">
              <i class="el-icon-bell"></i>
            </el-badge>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in noticeList"
              :key="index"
              @click.native="goMessage(item)"
              >{{ item.message }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="controll rt" v-else>
        <button @click="goLogin">登录</button>
        <button class="button-primary" @click="goRegister">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MyHeader",
  computed: {
    ...mapGetters("Login", ["user"]),
  },
  data() {
    return {
      active: 0,
      routeList: [
        {
          path: "/",
          name: "主站",
        },
        {
          path: "/video/list/hot",
          name: "特别推荐",
        },
        {
          path: "/video/OnlineList/",
          name: "直播"
        },
        {
          path: "/video/list/funny",
          name: "搞笑",
        },
        {
          path: "/video/list/science",
          name: "科幻",
        },
        {
          path: "/video/list/game",
          name: "游戏",
        },
        {
          path: "/video/list/sports",
          name: "体育",
        },
        {
          path: "/video/list/music",
          name: "音乐",
        },
      ],
      keyword: "",
      num: 100,
      noticeList: [
        { message: "恭喜您通过审核...", id: 111 },
        { message: "欢迎加入cilicili大家庭...", id: 222 },
      ],
    };
  },
  mounted() {
    console.log(this.user)
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    goRegister() {
      this.$router.push("/register");
    },
    goHome() {
      this.$router.push("/home/" + this.user.userId);
    },
    goAdmin() {
      this.$router.push("/home/admin");
    },
    goData() {
      this.$router.push("/home/data");
    },
    goOnline(){
      this.$router.push('/Online/index')
    },
    goIndex() {
      this.$router.push("/");
    },
    goInfo() {
      this.$router.push("/home/info");
    },
    goPublic() {
      this.$router.push("/video/publish");
    },
    goMessage(item) {
      this.$router.push({
        path: "/home/message/"+item.id
      });
    },
    onLogout() {
      // TODO:退出登录
      this.$axios.post(this.$store.state.host + "/user/outlogin", {
        userId: this.$store.state.userInfo.userId,
      });
      this.$store.dispatch("CHANGE_USERINFO", {});
    },
    onSearch() {
      console.log(this.$route);
      this.$router.push("/video/search/" + this.keyword);
    },
  },
};
</script>

<style lang="less" scoped>
.book-header {
  border-bottom: 1px solid @border-color;
  box-shadow: @box-shadow;
  width: 100%;
  font-size: 16px;
  background: url("../../assets/image/header_day.png") no-repeat center center;
  color: #fff;
  .active {
    color: #fff;
  }
  .content-main {
    padding: 20px;
    height: 160px;
    box-sizing: border-box;
    max-width: 1440px;
  }
  .logo {
    display: inline-block;
    cursor: pointer;
    img {
      height: 42px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
    }
    span {
      font-size: 24px;
      display: inline-block;
      vertical-align: middle;
      color: #fff;
      margin-right: 46px;
      line-height: 40px;
    }
  }
  ul,
  ul li,
  .controll,
  button,
  .search-wrapper {
    display: inline-block;
    line-height: 30px;
    vertical-align: middle;
    font-size: 14px;
  }
  ul {
    a {
      color: #fff;
    }
    li:first-child {
      margin-right: 12px;
    }
    li:hover {
      color: @primary-color;
      cursor: pointer;
    }
  }
  .search-wrapper {
    margin-left: 40px;
    border: 1px solid @border-color;
    border-radius: 16px;
    padding: 0 16px;
    input {
      height: 30px;
      width: 260px;
      border: 0;
      background: transparent;
      color: #fff;
    }
  }
  .controll {
    button:first-child {
      color: @primary-color;
      cursor: pointer;
      background: transparent;
    }
    .button-primary {
      height: 32px;
    }
  }
  .user-wrapper {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
      cursor: pointer;
      margin-right: -5px;
    }
    span {
      vertical-align: middle;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .button-primary {
    margin-left: 10px;
  }
  .icon-index-active {
    .icon("../../assets/image/index-active.png",32px,32px);
  }
  .icon-index-default {
    .icon("../../assets/image/index-default.png",32px,32px);
  }
  .icon-search {
    .icon("../../assets/image/icon-search.png");
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
  .router-item {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
