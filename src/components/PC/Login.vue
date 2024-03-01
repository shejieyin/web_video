<template>
  <div class="Login shadow-wrapper" v-show="$store.state.loginSwitch">
    <div class="modal">
      <i class="icon-close" @click="closeLogin"></i>
      <img src="@/assets/image/logo.png" class="logo-image" alt="">
      <ul class="tab-list">
        <li v-for="(item,index) in tabList" :class="$store.state.loginTab==index?'tab-active':''" @click="changeTab(index)" :key="index">{{item}}</li>
      </ul>
      <div class="login-wrapper" v-show="$store.state.loginTab == 0">
        <el-form
              :model="loginForm"
              :rules="loginRules"
              ref="loginForm"
            >
              <el-form-item prop="uname">
                <el-input
                  v-model="loginForm.uname"
                  placeholder="请输入用户名"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item prop="upwd">
                <el-input
                  v-model="loginForm.upwd"
                  placeholder="请输入密码"
                  show-password
                ></el-input>
              </el-form-item>
              <button class="button-primary" @click.prevent="onLogin">登录</button>
            </el-form>
      </div>
      <div class="register-wrapper" v-show="$store.state.loginTab == 1">
        <el-form
              :model="registerForm"
              :rules="registerRules"
              ref="registerForm"
            >
              <el-form-item prop="uname">
                <el-input
                  v-model="registerForm.uname"
                  placeholder="请输入用户名"
                  clearable
                  @blur="onUnameBlur"
                ></el-input>
              </el-form-item>
              <el-form-item prop="upwd">
                <el-input
                  v-model="registerForm.upwd1"
                  placeholder="请输入密码"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item prop="upwd">
                <el-input
                  v-model="registerForm.upwd2"
                  placeholder="请再次输入密码"
                  show-password
                  @blur="onUpwd2Blur"
                ></el-input>
              </el-form-item>
              <button class="button-primary" @click.prevent="onRegist">注册</button>
            </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {validateMobile} from '@/assets/utils/validator'
import {generateUUID} from '@/assets/utils/index'
export default {
  name: 'Login',
  data () {
    return {
      tabList: ['登录', '注册'],
      loginForm: {
        uname: '',
        upwd: ''
      },
      registerForm: {
        uname: '',
        upwd1: '',
        upwd2: ''
      },
      loginRules: {
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
      registerRules: {
        uname: [{ required: true, validator: validateMobile, trigger: "blur" }],
        upwd1: [{ required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 18,
            message: "长度在 5 到 18 个字符",
            trigger: "blur",
          },],
        upwd2: [{ required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 18,
            message: "长度在 5 到 18 个字符",
            trigger: "blur",
          },]
      }
    }
  },
  mounted() {
  },
  methods: {
    closeLogin() {
      this.$store.dispatch('CHANGE_LOGINSWITCH', false);
    },
    changeTab(index) {
      this.$store.dispatch('CHANGE_LOGINTAB', index);
    },
    onLogin() {
      //TODO:登陆接口
      this.$ajax.get(this.$store.state.host + '/user/login?userName=' + this.loginForm.uname + '&passWord=' + this.loginForm.upwd).then(data => {
        if (data.status === 200) {
          this.$message({
            message: '登录成功',
            type: 'success'
          });
          this.$store.dispatch('CHANGE_LOGINSWITCH', false);
          this.$store.dispatch('SET_TICKET', data.data);
          console.log(data.data)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    onUnameBlur() {
      this.$ajax.get(this.$store.state.host + '/user/checkUserName?userName=' + this.registerForm.uname).then(data => {
        if (data.status !== 200) {
          this.$message.error(data.msg);
          return false;
        } else {
          return true;
        }
      })
    },
    onUpwd2Blur() {
      if (this.registerForm.upwd1 !== this.registerForm.upwd2) {
        this.$message.error('密码输入不一致');
        return false;
      } else {
        return true;
      }
    },
    onRegist() {
      //TODO:注册接口
      if (!this.onUpwd2Blur()) return;
      this.$ajax.post(this.$store.state.host + '/user/save', {
        userName: this.registerForm.uname,
        passWord: this.registerForm.upwd1,
        nickName: this.registerForm.uname
      }).then(data => {
        if (data.status === 200) {
          this.$message({
            message: '注册成功，请登录',
            type: 'success'
          });
          this.$store.dispatch('CHANGE_LOGINTAB', 0);
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.modal{
  height:400px;
  background: #f2f2f2;
  button{
    display: block;
    width: 120px;
    margin: 0 auto;
  }
  .icon-close{
  .icon('../../assets/image/icon-close.png');
  position: absolute;
  right: -12px;
  top: -12px;
  cursor: pointer;
}
  .tab-list{
    text-align: center;
    margin-bottom: 12px;
    li{
      display: inline-block;
      padding: 10px;
      font-size: 16px;
      font-weight: bold;
      &.tab-active{
        color: @primary-color;
      }
    }
  }
}

</style>
