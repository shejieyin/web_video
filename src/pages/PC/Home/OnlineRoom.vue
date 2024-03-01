<template>
  <div>
    <el-form ref="form" :model="form" :rules="formRule" label-position="top" label-width="80px">
      <el-form-item label="频道名称" prop="channelName">
        <el-input v-model="form.channelName"></el-input>
      </el-form-item>
      <el-form-item label="频道类型" prop="channelTopic">
        <el-select v-model="form.channelTopic" placeholder="请选择频道类型">
          <el-option label="课程秘籍" value="1"></el-option>
          <el-option label="游戏" value="2"></el-option>
          <el-option label="娱乐" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="频道描述" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="是否生成回放视频" prop="recordSelect">
        <el-radio-group v-model="form.recordSelect">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道的图片" prop="photo">
        <el-upload
          class="avatar-uploader"
          :action="$store.state.host+'profile/pic/'+6"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button class="buttonC" type="primary" @click="submitForm('form')">发起直播</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import echarts from "echarts";
export default {
  name: "OnlineRoom",
  data() {
    return {
      //用于控制展示的card展示的内容
      status: "1-1",
      dataUrl:false,
      //用于控制申请状态的控制
      applyStatus: true,
      form: {
        channelName: "",
        channelTopic: "",
        description: "",
        recordSelect: "",
        photo: ""
      },
      imageUrl: "",
      postFilel: "",
      formRule: {
        channelName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        channelTopic: [
          { required: true, message: "请选择频道类型", trigger: "change" }
        ],
        description: [
          { required: true, message: "频道描述不能为空",trigger:"blur" }
          // { type: 'number', message: '证件号码必须为数字值'}
        ],
        recordSelect: [{ required: true, message: '请选择是否生成回放', trigger: 'change' }],
      }
    };
  },
  mounted() {
    // this.getHbase();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("可以执行申请相关提交");
        } else {
          console.log("请输入完整信息");
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.postFilel = file;
    },
    beforeAvatarUpload(file) {
      console.log("file");
      console.log(file);
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
      
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(keyPath);
      console.log(key);
      this.status = key;
    },
    getLine() {
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: "{b} : 播放{c}次"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: this.x_data
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} 次"
          }
        },
        series: [
          {
            data: this.y_data,
            type: "bar"
          }
        ]
      };
      let myChart = this.$echarts.init(document.getElementById("video_sum"));
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    getHbase() {
      this.$axios({
        method: "get",
        url: "/video/hbase",
        params: {}
      }).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.x_data = res.data.counts_x_data;
          this.y_data = res.data.counts_y_data;
          this.getLine();
        } else {
          this.$message({
            message: "获取数据失败",
            type: "warning"
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.data-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.applyTitle {
  font-size: 18px;
  font-weight: 400;
  margin: 5px 0 20px;
  text-align: center;
  color: #00a1d6;
}
.chart_wrapper {
  width: 100%;
  height: 300px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #222020;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #222020;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #222020;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.buttonC {
  margin-left: 40%;
}
</style>