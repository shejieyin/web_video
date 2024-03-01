<template>
  <div class="layout">
    <my-header ref="myheader"></my-header>
    <div class="content">
      <router-view ref="child"></router-view>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from '@/components/PC/MyHeader';
import MyFooter from '@/components/PC/MyFooter';
//import {getItem} from '@/assets/utils/cookie.js'
export default {
  name: 'Layout',
  components: { MyHeader, MyFooter },
  data() {
    return {};
  },
  // created() {
  //   this.$store.dispatch('SET_TICKET', getItem('EM_TICKET'));
  // }
  mounted(){}
};
</script>

<style lang="less" scoped>
.content {
  min-height: calc(100vh - 140px);
  background: #fff;
}
</style>
