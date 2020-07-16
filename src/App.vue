<template>
  <div>
    <Toast ref="toast" />
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';
import Toast from '@/components/Toast/index.vue';

export default {
  components: {
    Toast,
  },
  mounted() {
    Vue.prototype.$Toast = this.$refs.toast;
  },
};
</script>

<style lang="scss">
@import './assets/scss/all';
</style>
