<template>
  <section class="flex-grow px-6 relative">
    <!-- Notifications Button -->
    <div class="absolute top-[56px] right-4 mr-8">
      <button class="focus:outline-none relative bg-gray-200">
        <img src="/public/bell.png" alt="Notifications" class="note" style="width: 22.5px; height: 25px; opacity: 0;" />
        <span class="absolute top-0 right-0 h-2.5 w-2.5 bg-play-600 rounded-full"></span>
      </button>
    </div>

    <!-- Configuration Title -->
    <div class="relative" style="width: 340px; height: 42px; top: 5rem; left: 31px;">
      <h1 class="text-2xl font-bold mb-4 text-black">Configuration</h1>
    </div>

    <!-- Product Selection Section -->
    <div class="container mx-auto px-4 mt-[12rem]">
      <h3 class="text-center text-xl mb-8">Select Product Category</h3>

      <div class="flex justify-center gap-8">
        <!-- Plastic Product Card -->
        <div
          class="product-card flex flex-col w-[260px] h-[241px] bg-white shadow-sm rounded-xl cursor-pointer transform transition-transform hover:scale-105"
          @click="selectProduct('Plastic Product')"
        >
          <img src="/public/plastic.png" alt="Plastic Product" class="mx-auto" />
          <div class="bg-gray-100 border-t rounded-b-xl py-3 px-4">
            <p class="text-center mt-1 text-sm text-gray-500">Plastic Product</p>
          </div>
        </div>

        <!-- Agricultural Product Card -->
        <div
          class="product-card flex flex-col w-[260px] h-[241px] bg-white shadow-sm rounded-xl cursor-pointer transform transition-transform hover:scale-105"
          @click="selectProduct('Agricultural Product')"
        >
          <img src="/public/agric.png" alt="Agricultural Product" class="mx-auto" />
          <div class="border-t rounded-b-xl py-3 px-4">
            <p class="text-center mt-1 text-sm text-gray-500">Agricultural Product</p>
          </div>
        </div>
      </div>

      <div v-if="selectedProduct" class="text-center mt-40">
        <h3 class="text-xl mb-8">Select Parameters to Check</h3>
        <div class="mx-auto border border-gray-300 shadow-lg rounded-lg" style="width: 600px; height: 270px;">
          <select class="py-3 px-4 mx-auto mt-4 block w-[527.25px] border-transparent rounded-lg text-sm disabled:opacity-50" disabled>
            <option class="text-center text-black">{{ selectedProduct }}</option>
          </select>

          <!-- Parameters for Plastic -->
          <div v-if="selectedProduct === 'Plastic Product'" class="flex flex-col gap-y-8 w-[460px] justify-center mx-auto mt-5">
            <div class="flex items-center pl-4">
              <input type="checkbox" id="plastic-reusable" class="mt-0.5 w-4 h-4 accent-black" v-model="plasticParams.reusable" />
              <label for="plastic-reusable" class="text-sm text-gray-500 ms-2">Reusable Plastic</label>
            </div>
            <div class="flex items-center pl-4">
              <input type="checkbox" id="plastic-non-reusable" class="mt-0.5 w-4 h-4 accent-black" v-model="plasticParams.nonReusable" />
              <label for="plastic-non-reusable" class="text-sm text-gray-500 ms-2">Non-Reusable Plastic</label>
            </div>
          </div>

          <!-- Parameters for Agricultural -->
          <div v-if="selectedProduct === 'Agricultural Product'" class="flex flex-col gap-y-8 w-[460px] justify-center mx-auto mt-5 p-4 rounded-lg">
            <div class="flex items-center pl-4">
              <input type="checkbox" id="agric-perishable" class="mt-0.5 w-4 h-4 accent-black" v-model="agricParams.perishable" />
              <label for="agric-perishable" class="text-sm text-gray-500 ms-2">Perishable</label>
            </div>
            <div class="flex items-center pl-4">
              <input type="checkbox" id="agric-non-perishable" class="mt-0.5 w-4 h-4 accent-black" v-model="agricParams.nonPerishable" />
              <label for="agric-non-perishable" class="text-sm text-gray-500 ms-2">Non-perishable</label>
            </div>
          </div>
        </div>

        <!-- Submit Parameters Section -->
        <div class="hs-tooltip flex items-center mt-8">
          <input type="checkbox" id="hs-tooltip-example" class="hs-tooltip-toggle relative w-[3.25rem] h-7 p-px bg-gray-100" />
          <label for="hs-tooltip-example" class="text-sm text-gray-500 ms-3">Save Configuration</label>
        </div>
        <button @click="postData" type="button" class="py-3 px-6 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-black text-white">
          Monitor
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Track the selected product
const selectedProduct = ref(null);

// Track plastic product parameters
const plasticParams = ref({
  reusable: false,
  nonReusable: false,
});

// Track agricultural product parameters
const agricParams = ref({
  perishable: false,
  nonPerishable: false,
});

const selectProduct = (productName) => {
  selectedProduct.value = productName;
};

// Function to post data based on product selection
const postData = async () => {
  let selectedParams = {};

  if (selectedProduct.value === 'Plastic Product') {
    selectedParams = Object.keys(plasticParams.value).filter(key => plasticParams.value[key]);
  } else if (selectedProduct.value === 'Agricultural Product') {
    selectedParams = Object.keys(agricParams.value).filter(key => agricParams.value[key]);
  }

  try {
    const response = await axios.post('http://localhost:8000/api/Evaluate', {
      selectedClass: selectedProduct.value, // Ensure this is a string
      selectedParameter: selectedParams,    // Ensure this is an array of strings
    });

    console.log('Detection result:', response.data);
    alert('Detection successful. Check the console for details.');
  } catch (error) {
    console.error('Error submitting data:', error);
    alert('An error occurred while detecting objects.');
  }
};

</script>

