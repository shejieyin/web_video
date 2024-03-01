<template>
  <div class="article-edit">
    <div class="content-main container">
      <div class="content-wrapper">
        <p class="info-title">我的资料</p>
        <el-form
          ref="numberValidateForm"
          label-width="100px"
          class="video-name"
          :model="user"
          :rules="rules"
        >
          <el-form-item label="头像" prop="photoUrl">
            <el-upload
              class="avatar-uploader"
              :action="$store.state.host+'/img/upload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="user.photoUrl" :src="user.photoUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="用户名" prop="phoneNumber">
            <p>{{user.mobile}}</p>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input
              type="age"
              autocomplete="off"
              placeholder="最多输入20个文字/40个字符"
              v-model="user.nickname"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label="签名" prop="signture">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2 }"
              placeholder="请输入签名"
              v-model="user.signture"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="user.gender" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker v-model="user.birthday" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <button class="button-default" @click.prevent="onSave">保存</button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Info",
  computed: {
    ...mapState("Login", ["user"]),
  },
  data() {
    return {
      video: {
        title: "",
        cover: "",
        video: "",
        userId: "",
      },
      rules: {
        nickName: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 1,
            max: 40,
            message: "最多输入20个文字/40个字符",
            trigger: "blur",
          },
        ],
        gender: [
          { required: true, message: "请选择性别", trigger: "blur" }
        ],
      },
      options: [
        {
          value: "1",
          label: "男",
        },
        {
          value: "2",
          label: "女",
        },
        {
          value: "3",
          label: "保密",
        }
      ],
    };
  },
  mounted() {},
  methods: {
    handleAvatarSuccess(res, file) {
      this.video.cover = URL.createObjectURL(file.raw);
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
    // this.$store.state.host，直接从store中去提取服务地址，
    // 这种问题针对一个前段掉用多个后端服务器的情况
    onSave() {
      if (this.$route.params.id) {
        this.$axios
          .post(this.$store.state.host + "/upload/update", this.video)
          .then((data) => {
            if (data.code === 200) {
              this.$message({
                type: "success",
                message: data.msg,
              });
              this.$router.push("/home/" + this.user.userId);
            }
          });
      } else {
        this.$axios
          .post(this.$store.state.host + "/upload/add", this.article)
          .then((data) => {
            if (data.code === 200) {
              this.$message({
                type: "success",
                message: data.msg,
              });
              this.$router.push("/");
            }
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.article-edit {
  padding: 40px 0;
  .content-wrapper {
    padding: 60px 60px 40px 40px;
    .info-title{
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 40px;
    }
    .button-default {
      display: block;
      margin: 100px auto 0 auto;
      width: 140px;
    }
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
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
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>