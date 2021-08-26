<template>
  <div>
    <h1>Signup</h1>
    <div v-if="signingUp">
      <img src="../assets/eclipse.svg" alt="loading" />
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <form v-if="!signingUp" @submit.prevent="signup">
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
          Username must be longer than 3 and shorter than 30 characters. You can
          use only letters, numbers and under_scores.
        </h6>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            id="password"
            aria-describedby="passwordHelp"
            placeholder="Password"
          />
          <h6 id="passwordHelp" class="form-text text-muted">
            Password must be longer than 3 characters.
          </h6>
        </div>
        <div class="form-group col-md-6">
          <label for="confirmPassword">Confirm Password</label>
          <input
            v-model="user.confirmPassword"
            type="password"
            class="form-control"
            id="confirmPassword"
            aria-describedby="confirmPasswordHelp"
            placeholder="Password"
          />
          <h6 id="confirmPassword" class="form-text text-muted">
            Please confirm your Password.
          </h6>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Sign Up</button>
    </form>
  </div>
</template>

<script>
import Joi from 'joi';

const SIGNUP_URL = 'http://localhost:5000/auth/signup';

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
  confirmPassword: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .trim()
    .min(3)
    .required(),
});

export default {
  data: () => ({
    signingUp: false,
    errorMessage: '',
    user: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = '';
      },
    },
  },
  methods: {
    signup() {
      this.errorMessage = '';
      if (this.validUser()) {
        const body = {
          username: this.user.username,
          password: this.user.password,
        };
        this.signingUp = true;
        fetch(SIGNUP_URL, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'content-type': 'application/json',
          },
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
            localStorage.token = result.token;
            setTimeout(() => {
              this.signingUp = false;
              this.$router.push('/dashboard');
            }, 1000);
          })
          .catch((err) => {
            setTimeout(() => {
              this.signingUp = false;
              this.errorMessage = err.message;
            }, 1000);
          });
      }
      return null;
    },
    validUser() {
      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = 'Passwords must match!';
        return false;
      }
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
