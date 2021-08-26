<template>
  <div>
    <h1>Dashboard</h1>
    <h1 v-if="!user">Getting user information...</h1>
    <button @click="logout()" type="submit" class="btn btn-primary">
      Logout
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    user: {},
  }),
  mounted() {
    const API_URL = 'http://localhost:5000';
    fetch(API_URL, {
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.user) {
          this.user = result.user;
        } else {
          localStorage.removeItem('token');
          this.$router.push('/login');
        }
      });
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
};
</script>
