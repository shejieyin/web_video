<template>
  <div id="Index">
    <div class="container">
      <!-- 轮播图 -->
      <div class="banner">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="(item, index) in bannerList" :key="index">
            <img :src="item" alt="鼠标放在图片上要显示的文字" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 第一层 -->
      <div class="main-recommend clear">
        <div class="index-title">
          <i class="icon-fire"></i>
          <span>特别推荐</span>
          <div class="control rt">
            <button @click="handleChange()">
              <i class="el-icon-refresh"></i>换一换
            </button>
            <button @click="goList()">
              更多
              <i class="el-icon-arrow-right"></i>
            </button>
          </div>
        </div>
        <div class="video-cover lf" @click="goDetail(main_recommend)">
          <img :src="main_recommend.img" alt />
          <p class="video-name">{{ main_recommend.name }}</p>
          <div class="video-icon">
            <i class="icon-play"></i>
          </div>
        </div>
        <ul class="rt">
          <li v-for="(item, index) in main_recommend.list" :key="index">
            <img :src="item.img" alt @click="goDetail(item)" />
            <div class="video-name" @click="goDetail(item)">
              <p>{{ item.name }}</p>
              <p>
                <i class="el-icon-upload"></i>
                <span class="video-author">{{ item.author.name }}</span>
                <i class="icon-play rt"></i>
              </p>
              <p>{{ item.play_times }}次播放</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 第二层 -->
      <div class="floor clear">
        <div class="left-container">
          <div class="index-title">
            <i class="icon-fire"></i>
            <span>热点</span>
            <div class="control rt">
              <button @click="handleChange()">
                <i class="el-icon-refresh"></i>换一换
              </button>
              <button @click="goList()">
                更多
                <i class="el-icon-arrow-right"></i>
              </button>
            </div>
          </div>
          <ul v-if="f1_list.length > 0">
            <li v-for="(item, index) in f1_list" :key="index">
              <div>
                <div class="video-cover">
                  <img :src="item.img" alt @click="goDetail(item)" />
                  <div class="video-icon">
                    <i class="icon-play"></i>
                  </div>
                  <div class="video-info">
                    <i class="icon-play2"></i>
                    <span>{{ item.play_times }}</span>
                    <i class="icon-good"></i>
                    <span>{{ item.good }}</span>
                    <span>{{ item.duration | format_duration }}</span>
                  </div>
                </div>
                <p class="video-name" @click="goDetail(item)">
                  {{ item.name }}
                </p>
                <p class="video-author" @click="goHome(item.author.id)">
                  <i class="el-icon-upload"></i>
                  {{ item.author.name }}
                </p>
              </div>
            </li>
          </ul>
          <ul v-else>
            <li v-for="(item, index) in 8" :key="index">
              <BulletListLoader></BulletListLoader>
            </li>
          </ul>
        </div>
        <div class="right-container">
          <div class="index-title">
            <i class="icon-rank"></i>
            <span>排行榜</span>
            <div class="control rt">
              <button @click="goList()">
                更多
                <i class="el-icon-arrow-right"></i>
              </button>
            </div>
          </div>
          <ul class="ranking-list">
            <li
              v-for="(item, index) in f1_ranking"
              :key="index"
              @click="goDetail(item)"
            >
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
      <img src="@/assets/image/Index/ad.jpg" alt class="ad" />
      <!-- 第三层 -->
      <div class="floor clear">
        <div class="left-container">
          <div class="index-title">
            <i class="icon-game"></i>
            <span>游戏</span>
            <div class="control rt">
              <button><i class="el-icon-refresh"></i>换一换</button>
              <button @click="goList()">
                更多
                <i class="el-icon-arrow-right"></i>
              </button>
            </div>
          </div>
          <ul v-if="f1_list.length > 0">
            <li v-for="(item, index) in f1_list" :key="index">
              <div>
                <div class="video-cover">
                  <img :src="item.img" alt @click="goDetail(item)" />
                  <div class="video-icon">
                    <i class="icon-play"></i>
                  </div>
                  <div class="video-info">
                    <i class="icon-play2"></i>
                    <span>{{ item.play_times }}</span>
                    <i class="icon-good"></i>
                    <span>{{ item.good }}</span>
                    <span>{{ item.duration | format_duration }}</span>
                  </div>
                </div>
                <p class="video-name" @click="goDetail(item)">
                  {{ item.name }}
                </p>
                <p class="video-author" @click="goHome(item.author.id)">
                  <i class="el-icon-upload"></i>
                  {{ item.author.name }}
                </p>
              </div>
            </li>
          </ul>
          <ul v-else>
            <li v-for="(item, index) in 8" :key="index">
              <BulletListLoader></BulletListLoader>
            </li>
          </ul>
        </div>
        <div class="right-container">
          <div class="index-title">
            <i class="icon-recommend"></i>
            <span>热门推荐</span>
            <div class="control rt">
              <button @click="goList()">
                更多
                <i class="el-icon-arrow-right"></i>
              </button>
            </div>
          </div>
          <el-carousel
            height="300px"
            arrow="nerver"
            indicator-position="outside"
          >
            <el-carousel-item v-for="(item, index) in adList" :key="index">
              <img :src="item" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <!-- 右侧导航 -->
    <div class="right-nav">
      <ul>
        <li
          v-for="(item, index) in floors"
          :key="index"
          @click="handleScroll(item.top)"
        >
          {{ item.name }}
        </li>
        <li @click="handleScroll(0)">
          <i class="el-icon-arrow-up"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { BulletListLoader } from "vue-content-loader";
export default {
  name: "Index",
  components: {
    BulletListLoader,
  },
  data() {
    return {
      main_recommend: {
        img: "./static/main.jpeg",
        name: "三号种子资格赛：SN vs LGD！",
        list: [
          {
            img: "./static/1.jpg",
            name: "《明日方舟》EP - ALIVE",
            author: {
              id: "111",
              name: "明日方舟",
            },
            play_times: 1000,
          },
          {
            img: "./static/2.jpg",
            name: "《明日方舟》EP - ALIVE",
            author: {
              id: "111",
              name: "明日方舟",
            },
            play_times: 1000,
          },
          {
            img: "./static/3.jpg",
            name: "《明日方舟》EP - ALIVE",
            author: {
              id: "111",
              name: "明日方舟",
            },
            play_times: 1000,
          },
          {
            img: "./static/4.jpg",
            name: "《明日方舟》EP - ALIVE",
            author: {
              id: "111",
              name: "明日方舟",
            },
            play_times: 1000,
          },
          {
            img: "./static/5.jpg",
            name: "《明日方舟》EP - ALIVE",
            author: {
              id: "111",
              name: "明日方舟",
            },
            play_times: 1000,
          },
          {
            img: "./static/6.jpg",
            name: "《明日方舟》EP - ALIVE",
            author: {
              id: "111",
              name: "明日方舟",
            },
            play_times: 1000,
          },
        ],
      },
      f1_list: [],
      f1_ranking: [
        {
          title:
            "凡人修仙传骗投资？糊弄观众？导演抵押房子卑微解释！难道一定要毁了它吗？",
        },
        {
          title:
            "我被MIT哈佛CMU录取了！计算机博士申请季纪实",
        },
        {
          title:
            "【唐宇迪】数据挖掘和数据分析有什么区别？学哪个好就业？",
        },
        {
          title:
            "周杰伦北大演讲：你可以不平凡 完整版",
        },
        {
          title:
            "李沐老师：GPT时代AI怎么学？ 动手学就是了！",
        },
        {
          title:
            "特斯拉改装120寸轮毂，增加“逆天”功能",
        },
        {
          title:
            "日本泡沫经济时期的负遗产!堆满废墟酒店的栃木县鬼怒川温泉!",
        },
        {
          title:
            "一口气了解硅谷银行倒闭危机",
        }
      ],
      floors: [
        { name: "特别推荐", top: 0 },
        { name: "搞笑", top: 500 },
        { name: "科幻", top: 1000 },
        { name: "游戏", top: 0 },
        { name: "体育", top: 0 },
        { name: "音乐", top: 0 },
      ],
      bannerList: [
        "./static/banner1.png",
        "./static/banner2.png",
        "./static/banner3.png",
        "./static/banner4.png",
      ],
      adList: [
        "./static/ad1.png",
        "./static/ad2.png",
        "./static/ad3.png",
        "./static/ad4.png",
        "./static/ad5.png",
        "./static/ad6.png",
      ],
    };
  },
  mounted() {
    //TODO:获取楼层数据
    for (let i = 1; i < 9; i++) {
      this.f1_list.push({
        img: "./static/" + i + ".jpg",
        name: "乌克兰体操公主的拳击训练，吃我这一小拳拳！",
        author: { id: 111, name: "乌克兰体操达纳塔" },
        play_times: 1000,
        good: 200,
        duration: 1000,
      });
    }
  },
  methods: {
    handleScroll(top) {
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    },
    goDetail(item) {
      this.$router.push("/video/detail/" + item.id);
    },
    goList(tag) {
      this.$router.push("/video/list/" + tag);
    },
    goHome(id) {
      this.$router.push("/home/" + id);
    },
    handleChange() {
      //TODO:更换当前楼层数据
    },
  },
};
</script>

<style lang="less" scoped>
#Index {
  padding-top: 60px;
  img {
    max-width: 100%;
    border-radius: 2px;
  }
  .ad {
    cursor: pointer;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  .left-container {
    width: 840px;
    float: left;
  }
  .right-container {
    width: 330px;
    float: right;
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
  .icon-fire {
    .icon("../../../assets/image/Index/icon_fire.png");
  }
  .icon-game {
    .icon("../../../assets/image/Index/icon_game.png");
  }
  .icon-rank {
    .icon("../../../assets/image/Index/icon_rank.png");
  }
  .icon-recommend {
    .icon("../../../assets/image/Index/icon_recommend.png");
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
  .main-recommend {
    margin: 40px 0;
    color: #fff;
    .index-title {
      color: #333;
    }
    .video-cover {
      width: 520px;
      height: 248px;
      display: inline-block;
      margin-right: 10px;
      position: relative;
      overflow: hidden;
      border-radius: 2px;
      cursor: pointer;
      &:hover {
        .video-icon {
          position: absolute;
          bottom: 40px;
          right: 20px;
          background: rgba(0, 0, 0, 0.7);
          padding: 10px;
          border-radius: 2px;
        }
      }
    }
    .video-name {
      width: 100%;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      background-image: linear-gradient(
        to bottom,
        transparent,
        rgba(0, 0, 0, 0.8)
      );
      p {
        padding: 0 5px;
      }
    }
    ul {
      width: 650px;
      display: inline-block;
      li {
        display: inline-block;
        width: 210px;
        height: 120px;
        margin-right: 10px;
        margin-bottom: 5px;
        position: relative;
        overflow: hidden;
        border-radius: 2px;
        cursor: pointer;
        &:hover {
          div.video-name {
            transform: translateY(0);
            background: rgba(0, 0, 0, 0.7);
            p:first-child {
              background: transparent;
              margin-top: 40px;
            }
          }
        }
        div.video-name {
          height: 100%;
          transform: translateY(92px);
          transition: all 0.3s ease-in;
          color: #ccc;
          p:first-child {
            background-image: linear-gradient(
              to bottom,
              transparent,
              rgba(0, 0, 0, 0.8)
            );
            color: #fff;
            padding: 5px 0;
            & + p {
              margin: 5px 0;
            }
          }
        }
        .video-author {
          margin-top: 10px;
          cursor: pointer;
        }
        p {
          font-size: 12px !important;
        }
        &:nth-child(n + 4) {
          margin-bottom: 0;
        }
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }
  .floor {
    margin: 40px 0;
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
  .right-nav {
    background: #fff;
    border: 1px solid #f2f2f2;
    border-radius: 4px;
    position: fixed;
    right: 0;
    top: 200px;
    box-shadow: @box-shadow;
    color: #505050;
    z-index: 9999;
    li {
      padding: 12px;
      width: 50px;
      text-align: center;
      border-bottom: 1px solid #f2f2f2;
      cursor: pointer;
      &:last-child {
        border: 0;
      }
    }
  }
}
</style>
