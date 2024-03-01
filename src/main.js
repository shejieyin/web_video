// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import axios from './http'
import 'lib-flexible'
import * as filters from './assets/filter'
require('./mock');
// import VideoPlayer from 'vue-video-player'
// require('video.js/dist/video-js.css')
// // require('vue-video-player/src/custom-theme.css')
// import videojsC from 'videojs-contrib-hls'


// Vue.use(VideoPlayer)
// Vue.use(videojsC)

import {
  Loading,
  Message,
  Form,
  FormItem,
  Input,
  Select,
  Checkbox,
  DatePicker,
  TimePicker,
  Button,
  Option,
  Col,
  Row,
  Carousel,
  CarouselItem,
  Upload,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tabs,
  TabPane,
  Tag,
  Badge,
  MessageBox,
} from 'element-ui'

Vue.use(Loading.directive)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Form)
Vue.use(Checkbox)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Button)
Vue.use(Option)
Vue.use(Col)
Vue.use(Row)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Badge)
// Vue.use(MessageBox)


Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.prototype.$confirm = MessageBox.confirm

Vue.prototype.$axios = axios
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
