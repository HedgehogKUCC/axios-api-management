<template>
  <div>
    <div class="container">
      <form class="form-signin" @submit.prevent="signin">
        <h1 class="h3 mb-3 font-weight-normal">
          請先登入
        </h1>
        <div class="form-group">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            name="email"
            v-model="user.email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
            autocomplete
          >
        </div>
        <div class="form-group">
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            name="password"
            v-model="user.password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
            autocomplete
          >
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">
          登入
        </button>
        <br>
        <button class="btn btn-outline-primary btn-block" type="button" @click="signout">
          登出
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { apiUserLogin, apiUserLogout } from '@/api/index';

export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      token: '',
      expired: '',
    };
  },
  methods: {
    signin() {
      apiUserLogin(this.user).then((res) => {
        this.token = res.data.token;
        this.expired = res.data.expired;
        document.cookie = `0717Demo=${this.token}; expires=${new Date(this.expired * 1000)};`;
        this.$router.push('/petlist');
      }).catch((err) => {
        console.log(err);
      });
    },
    signout() {
      const params = {
        Authorization: `Bearer ${this.token}`,
        api_token: `${this.token}`,
      };

      apiUserLogout(params).then((res) => {
        if (res.data.success) {
          document.cookie = '0717Demo=; expires=;';
        }
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
