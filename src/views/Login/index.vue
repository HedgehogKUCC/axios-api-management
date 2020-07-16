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
      </form>
    </div>
  </div>
</template>

<script>
import { apiUserLogin } from '@/api/index';

export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      apiUserLogin(this.user).then((res) => {
        // FIXME: ESLint 提示用 object destructuring
        const { token, expired } = res.data;
        document.cookie = `0717Demo=${token}; expires=${new Date(expired * 1000)};`;
        this.$router.push('/petlist');
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
