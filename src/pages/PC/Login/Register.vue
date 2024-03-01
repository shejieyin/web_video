<template>
  <div class="register">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0">
      <el-form-item label prop="uname">
        <el-input
          prefix-icon="el-icon-mobile-phone"
          placeholder="请输入手机号"
          v-model="loginForm.uname"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label prop="upwd1">
        <el-input
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          v-model="loginForm.upwd1"
          show-password
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label prop="upwd2">
        <el-input
          prefix-icon="el-icon-lock"
          placeholder="请再次输入密码"
          v-model="loginForm.upwd2"
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
          <img :src="src" alt="" ref="codeImg" />
          <p @click="generateImageCode()">
            <i class="el-icon-refresh-right"></i>
            <span>换一换</span>
          </p>
        </div>
      </el-form-item>
      <button class="btn" @click="submit()">注册</button>
    </el-form>
  </div>
</template>

<script>
import { validateMobile } from "@/assets/utils/validator";
import { generateUUID } from "@/assets/utils/index";
import { getItem } from "@/assets/utils/cookie";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        uname: "",
        nickname: "",
        upwd1: "",
        upwd2: "",
        code: "",
      },
      rules: {
        uname: [{ required: true, validator: validateMobile, trigger: "blur" }],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 5,
            max: 18,
            message: "长度在 5 到 12 个字符",
            trigger: "blur",
          },
        ],
        upwd1: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 18,
            message: "长度在 5 到 18 个字符",
            trigger: "blur",
          },
        ],
        upwd2: [
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
      imageCodeId: "",
      preimageCodeId: "",
    };
  },
  mounted() {
    this.generateImageCode();
    this.$parent.active = 1;
  },
  methods: {
    submit() {
      //TODO:注册接口
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          this.$axios
            .post(this.$store.state.host + "passport/register", {
              mobile: this.loginForm.uname,
              img_code: this.loginForm.code,
              password: this.loginForm.upwd1,
              img_code_id: this.imageCodeId
            })
            .then((data) => {
              if (data.errno == 0) {
                this.$message({
                  message: "注册成功，请登陆",
                  type: "success",
                });
                this.$router.push('/login')
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
        "http://服务器地址/passport/image_code?cur_id=" +
        this.imageCodeId +
        "&pre_id=" +
        this.preimageCodeId;

      //将image_Url设置到img标签中src, IMG标签只要设置了里面的src属性,会自动去请求跟上的地址
      this.src = image_url;

      // 记录上一次的uuid
      this.preimageCodeId = this.imageCodeId;
    },
  },
};
</script>
<style lang="less" scoped>
.register {
  width: 340px;
  margin: 0 auto;
  text-align: center;
  .el-form-item {
    margin-bottom: 32px;
  }
  button {
    margin-top: 40px;
    width: 100%;
    background: #00a0d8;
    color: #fff;
  }
}
</style>