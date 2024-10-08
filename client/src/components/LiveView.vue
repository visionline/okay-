<template>
  <div class="flex-grow px-6 relative bg-gray-200">
    <!-- Main Content Area -->
    <section class="h-50 flex flex-col items-center justify-center">
      <!-- Production Line Status Header -->
      <div class="relative flex items-center justify-between w-[80%] mb-8" style="height: 42px;">
        <h1 class="text-lg font-bold">Live Conveyor Feed</h1>
        <h1>No of Products: 0</h1> <!-- Set to 0 since there are no products -->
      </div>

      <!-- Conditional Rendering: Show "No Product" if no products available -->
      <div class="text-center text-lg font-semibold">
        No Product
        <div class="border-bottom-line"></div> <!-- Horizontal black line -->
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.border-bottom-line {
  border-bottom: 2px solid black; /* Black horizontal line */
  width: 600px; /* Full width of the container */
  margin-top: 0px; /* Spacing between "No Product" and the line */
}
</style>

