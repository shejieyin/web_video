
import axios from "axios"
import qs from "qs"
import store from "@/vuex/store"
import {
  Message,
  Loading
} from 'element-ui'

let loading;
const baseUrl='这个位置要放你的后端接口地址' //这个地方是必须要写的，否则你系统中的功能接口都不可以使用
const Axios = axios.create({
  timeout: 10000,
  baseUrl : baseUrl,
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
});

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    if (!config.hideLoading) {
      loading = Loading.service({
        lock: true,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    }
    config.headers['X-CSRFToken'] = store.getters.token
    if (config.method !== "get") {

      if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=utf-8') {
        // 序列化
        config.data = qs.stringify(config.data);
      }
    }
    return config;
    s
  },
  error => {
    Message({
      showClose: true,
      message: error,
      type: "info"
    });
    return Promise.reject(error);
  }
);
Axios.interceptors.response.use(
  res => {
    loading && loading.close();
    return Promise.resolve(res.data);
  },
  error => {
    loading && loading.close();
    Message({
      showClose: true,
      message: error,
      type: "info"
    });
    return Promise.reject(error);
  }
);

export default Axios;
