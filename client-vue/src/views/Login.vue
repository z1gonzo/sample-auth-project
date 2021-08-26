<template>
  <div>
    <h1>Login</h1>
    <div v-if="loggingIn">
      <img src="../assets/eclipse.svg" alt="loading" />
    </div>
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>
    <form v-if="!loggingIn" @submit.prevent="login()">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          v-model="user.username"
          type="text"
          class="form-control"
          id="username"
          aria-describedby="usernameHelp"
          placeholder="Enter Username"
        />
        <h6 id="usernameHelp" class="form-text text-muted">
          Enter your username to Login
        </h6>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="user.password"
          type="password"
          class="form-control"
          id="password"
          aria-describedby="passwordHelp"
          placeholder="Enter password"
        />
        <h6 id="passwordHelp" class="form-text text-muted">
          Enter your password to Login
        </h6>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
import Joi from 'joi';

const LOGIN_URL = 'http://localhost:5000/auth/login';

const schema = Joi.object().keys({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .trim()
    .min(3)
    .required(),
});

export default {
  data: () => ({
    errorMessage: '',
    loggingIn: false,
    user: {
      username: '',
      password: '',
    },
  }),
  methods: {
    login() {
      this.errorMessage = '';
      if (this.validUser()) {
        this.loggingIn = true;
        const body = {
          username: this.user.username,
          password: this.user.password,
        };

        fetch(LOGIN_URL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(body),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return res.json().then((err) => {
              throw new Error(err.message);
            });
          })
          .then((result) => {
            console.log(result);
            localStorage.token = result.token;
            // logginging inging
            setTimeout(() => {
              this.loggingIn = false;
              this.$router.push('/dashboard');
            }, 1000);
          })
          .catch((err) => {
            setTimeout(() => {
              this.loggingIn = false;
              this.errorMessage = err.message;
            }, 1000);
          });
      }
    },
    validUser() {
      const result = Joi.validate(this.user, schema);
      if (result.error === null) {
        return true;
      }
      if (result.error.message.includes('username')) {
        this.errorMessage = 'Username is invalid!';
      } else {
        this.errorMessage = 'Password is invalid!';
      }
      return false;
    },
  },
};
</script>

<style></style>
