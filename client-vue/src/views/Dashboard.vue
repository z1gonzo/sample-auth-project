<template>
  <div>
    <h1>Dashboard</h1>
    <h1 v-if="!user">Getting user information...</h1>
    <h1 v-if="user">Hello, {{ user.username }}!!!</h1>
    <button @click="logout()" type="submit" class="btn btn-primary">
      Logout
    </button>
    <button @click="showForm = !showForm" class="btn btn-primary">
      Toggle Form
    </button>
    <form v-if="showForm" @submit.prevent="addNote()">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          v-model="newNote.title"
          type="text"
          class="form-control"
          id="title"
          aria-describedby="titleHelp"
          placeholder="Enter a title"
          required
        />
        <small id="titleHelp" class="form-text text-muted"
          >Enter a descriptive title for your note.</small
        >
      </div>
      <div class="form-group">
        <label for="note">Note</label>
        <textarea
          v-model="newNote.note"
          id="note"
          rows="3"
          class="form-control"
          placeholder="Enter your note."
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-success">Add Note</button>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    showForm: true,
    user: null,
    newNote: {
      title: '',
      note: '',
    },
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
        if (result.user) {
          this.user = result.user;
        } else {
          this.logout();
        }
      });
  },
  methods: {
    addNote() {
      fetch(`${API_URL}api/v1/notes`, {
        method: 'post',
        body: JSON.stringify(this.newNote),
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.token}`,
        },
      });
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
};
</script>
