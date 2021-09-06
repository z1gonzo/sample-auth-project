<template>
  <div class="home text-center">
    <div class="jumbotron mt-5">
      <h1 class="display-3">Auth Sampler!</h1>
      <p class="lead">Learning Auth is dope!</p>
      <hr class="my-4" />
      <p>
        Sing with
        <router-link
          class="btn btn-primary btn-lg"
          :to="{ name: 'login' }"
          role="button"
        >
          Sign
        </router-link>
      </p>
      <p class="lead">
        <router-link
          class="btn btn-primary btn-lg"
          :to="{ name: 'signup' }"
          role="button"
        >
          Sign Up
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
};
</script>
