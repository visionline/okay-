
<template>
  <div class="app-container">
    <Sidebar />
    <main class="main-content">
      <router-view /> <!-- This is where your page content will be rendered -->
    </main>
  </div>
</template>

<script setup>
import Sidebar from './components/Navbar.vue'; // Adjust the path as necessary
</script>

<style scoped>
.app-container {
  display: flex; /* Use flexbox to align sidebar and main content */
}

.main-content {
  flex-grow: 1; /* Take up the remaining width */
  padding: 20px; /* Optional padding */
  background-color: #f9f9f9; /* Example background color */
  /* You can adjust styles as needed */
}
</style>
