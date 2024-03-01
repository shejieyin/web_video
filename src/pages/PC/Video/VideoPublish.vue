<template>
  <div class="article-edit">
    <div class="content-main container">
      <div class="content-wrapper">
        <el-form
          ref="numberValidateForm"
          label-width="100px"
          class="video-name"
          :model="video"
          :rules="rules"
        >
          <el-form-item label="标题" prop="title">
            <el-input
              type="age"
              autocomplete="off"
              placeholder="最多输入20个文字/40个字符"
              v-model="video.title"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="封面" prop="cover">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="video.cover" :src="video.cover" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="视频" prop="video">
            <el-upload
              class="upload-demo"
              action="对应文件上传的服务器地址"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传mp4/avi/mov/rmvb/flv文件，且不超过1G</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2 }"
              placeholder="请输入视频描述"
              v-model="video.desc"
            ></el-input>
          </el-form-item>
          <el-form-item label="类别" prop="type">
            <el-select v-model="video.type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签" prop="tag">
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </el-form-item>

          <button class="button-default" @click.prevent="onSave('numberValidateForm')">发布</button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "VideoPublish",
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
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "最多输入5个文字到10个字符",
            trigger: "blur",
          },
        ],
        video: [{ required: true, message: "请输入内容", trigger: "blur" }],
        type: [{ required: true, message: "请选择类别", trigger: "blur" }],
      },
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
      options: [
        {
          value: "1",
          label: "搞笑",
        },
        {
          value: "2",
          label: "科幻",
        },
        {
          value: "3",
          label: "游戏",
        },
        {
          value: "4",
          label: "体育",
        },
        {
          value: "5",
          label: "音乐",
        },
      ],
    };
  },
  mounted() {
    this.video.userId = this.user.userId;
    if (this.$route.params.id) {
      this.$axios
        .get(
          this.$store.state.host +
            "/detail/queryOne?articleId=" +
            this.$route.params.id
        )
        .then((data) => {
          this.article = data.data;
        });
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.video.cover = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if(!isJPG){
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }else if(!isLt2M){
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }else{
        this.video.cover = URL.createObjectURL(file);
				return false
      }
      return isJPG && isLt2M;
    },
    onSave(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            //如果验证通过，直接在下面写提交的方法就可以
          } else {
            //如果验证不通过，则直接做出提示
            return false;
          }
        });
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
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>

<style lang="less" scoped>
.article-edit {
  padding: 40px 0;
  .content-wrapper {
    padding: 60px 60px 40px 20px;
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
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 120px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>