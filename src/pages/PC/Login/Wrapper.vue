<template>
  <div id="Wrapper">
    <div class="container">
      <ul>
        <router-link
          v-for="(item, index) in routeList"
          :to="item.path"
          :key="index"
        >
          <li :class="index == active ? 'active' : ''" @click="active = index">
            <span class="router-item">{{ item.name }}</span>
          </li>
        </router-link>
      </ul>
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      routeList: [
        {
          path: "/login",
          name: "登陆",
        },
        {
          path: "/register",
          name: "注册",
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
#Wrapper {
  .login-banner {
    text-align: center;
    background: #00a0d8;
    height: 86px;
    img {
      width: 980px;
      height: 86px;
    }
  }
  .active {
    color: @primary-color;
  }
  ul {
    margin: 30px 0;
    text-align: center;
    a {
      color: #666;
    }
    li {
      display: inline;
      font-size: 20px;
      padding: 0 24px;
    }
    a:first-child li {
      border-right: 2px solid #666;
    }
    li:hover {
      color: @primary-color;
      cursor: pointer;
    }
  }
}
</style>
<style lang="less">
.auth-code {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  p {
    cursor: pointer;
    font-size: 12px;
    color: #666;
    margin-left: 5px;
  }
  img {
    width: 100px;
  }
}
</style>