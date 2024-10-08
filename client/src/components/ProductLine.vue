<template>
  <div class="flex-grow px-6 relative bg-green-100 mt-8">
    <!-- Main Content Area -->
    <section class="h-screen flex flex-col items-center justify-center">
      <!-- Production Line Status Header -->
      <div class="relative flex items-center justify-between w-[80%] mb-8" style="height: 42px;">
        <h1 class="text-lg font-bold">Production Line Status</h1>
        <h1>No of Products: {{ products.length }}</h1>
      </div>

      <!-- Conditional Rendering: Show "No Product" if no products available -->
      <div v-if="products.length === 0" class="text-center text-lg font-semibold">
        No Product
      </div>

      <!-- Two-Column Box: Display if products are available -->
      <div v-else class="grid grid-cols-2 gap-8 p-12 w-[700px]">
        <!-- Column 1 (Metals) -->
        <div v-for="(product, index) in products" :key="index" class="border p-4 flex flex-col items-center space-y-4" style="border-radius: 30px;">
          <h4 class="text-lg font-semibold">{{ product.lineName }}</h4>
          <p>Status: <span>{{ product.status }}</span></p>
          <!-- Icons in Circles -->
          <div class="flex space-x-4">
            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <img src="/public/pause.png" alt="Pause Icon" class="w-8 h-8">
            </div>
            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <img src="/public/icons8-play-30.png" alt="Play Icon" class="w-8 h-8">
            </div>
            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <img src="/public/stop.png" alt="Stop Icon" class="w-8 h-8">
            </div>
          </div>
          <button type="button" class="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-100 focus:outline-none focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:bg-black dark:text-white">
            View Metric
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Dummy product data
      products: [
        { lineName: "Line 2: Metals", status: "Active" },
        { lineName: "Line 2: Plastic", status: "Active" }
      ]
    };
  }
};
</script>

