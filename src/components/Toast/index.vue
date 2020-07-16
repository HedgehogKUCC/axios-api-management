<template>
  <div class="toast-msg">
    <div
      v-for="(item, index) in messages" :key="index"
      class="alert alert-dismissible fade show mb-0 text-center"
      :class="'alert-' + item.status"
      role="alert"
    >
      <strong>{{ item.message }}</strong>
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
        @click="removeMessage(index)"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    add(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        timestamp,
        message,
        status,
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessageWithTiming(timestamp) {
      setTimeout(() => {
        this.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            this.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
    removeMessage(i) {
      this.messages.splice(i, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.toast-msg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
}
</style>
