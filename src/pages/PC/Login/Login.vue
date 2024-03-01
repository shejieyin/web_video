<template>
  <div class="login">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0">
      <el-form-item label prop="uname">
        <el-input
          prefix-icon="el-icon-mobile-phone"
          placeholder="请输入手机号"
          v-model="loginForm.uname"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label prop="upwd">
        <el-input
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          v-model="loginForm.upwd"
          show-password
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label prop="code">
        <el-input
          prefix-icon="el-icon-key"
          placeholder="请输入验证码"
          v-model="loginForm.code"
          clearable
        ></el-input>
        <div class="auth-code">
          <img :src="src" alt="" />
          <p @click="generateImageCode()">
            <i class="el-icon-refresh-right"></i>
            <span>换一换</span>
          </p>
        </div>
      </el-form-item>
      <button class="btn" @click="submit()">登陆</button>
    </el-form>
  </div>
</template>

<script>
import { validateMobile } from "@/assets/utils/validator";
import { generateUUID } from "@/assets/utils/index";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        uname: "",
        upwd: "",
        code:""
      },
      rules: {
        uname: [{ required: true, validator: validateMobile, trigger: "blur" }],
        upwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 18,
            message: "长度在 5 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
      src: "",
      preimageCodeId: "",
    };
  },
  mounted() {
    this.generateImageCode();
    this.$parent.active=0
  },
  methods: {
    submit() {
      //TODO:登陆接口
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          this.$axios
            .post(this.$store.state.host + "passport/login", {
              mobile: this.loginForm.uname,
              password: this.loginForm.upwd,
              img_code: this.loginForm.code,
              img_code_id: this.imageCodeId
            })
            .then((data) => {
              if (data.errno == 0) {
                var user_id = data.user_id;
                this.$axios
                  .get(this.$store.state.host + "user_profile/get_user_info?user_id=" + user_id)
                  .then((data) => {
                    if (data.errno == 0) {
                      this.$message({
                        message: "登陆成功！",
                        type: "success",
                      });
                      this.$store.dispatch("Login/CHANGE_USER", {
                        user: data.info,
                      });
                      this.$router.push(this.$route.query.redirect || "/");
                    }
                  });
              } else {
                this.$message({
                  message: data.errmsg,
                  type: "warning",
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    generateImageCode() {
      //生成一个随机字符串uuid
      this.imageCodeId = generateUUID();

      //拼接请求路径,和一个字符串没有什么两样
      let image_url =
        "http://39.106.195.80:8000/passport/image_code?cur_id=" +
        this.imageCodeId +
        "&pre_id=" +
        this.preimageCodeId;

      //将image_Url设置到img标签中src, IMG标签只要设置了里面的src属性,会自动去请求跟上的地址

      this.src = image_url;

      // 记录上一次的uuid
      this.preimageCodeId = this.imageCodeId;
    }
  },
};
</script>
<style lang="less" scoped>
.login {
  width: 340px;
  margin: 0 auto;
  text-align: center;
  z-index: 9999;
  .title {
    color: #707070;
    font-size: 30px;
    margin-bottom: 60px;
  }
  .el-form-item {
    margin-bottom: 32px;
  }
  button {
    margin-top: 40px;
    width: 100%;
    background: @primary-color;
    color: #fff;
  }
}
</style>