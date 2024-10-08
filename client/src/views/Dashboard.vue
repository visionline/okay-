<template>
  <div class="flex-grow px-6 relative">
    <!-- Notifications Section -->
    <div class="absolute top-[56px] right-4 mr-8">
      <button class="focus:outline-none relative bg-gray-200">
        <img
          src="/public/bell.png"
          alt="Notifications"
          class="note"
          style="
            width: 22.5px;
            height: 25px;
            top: 2.5px;
            left: 3.75px;
            gap: 0px;
            opacity: 0px;
          "
        />
        <span class="absolute top-0 right-0 h-2.5 w-2.5 bg-play-600 rounded-full"></span>
      </button>
    </div>

    <div class="relative" style="width: 240px; height: 42px; top: 5rem; left: 342px;">
      <h1 class="text-2xl font-bold mb-1">Recent activity</h1>
    </div>

    <!-- Table Section -->
    <table class="border-collapse border border-gray-200" style="width: 1006px; border-radius: 40px; margin-top: 8rem;">
      <thead style="border-radius: 40px">
        <tr>
          <th class="border border-gray-300 p-2 bg-black text-white">Line Name</th>
          <th class="border border-gray-300 p-2 bg-black text-white">Processed Items</th>
          <th class="border border-gray-300 p-2 bg-black text-white">Accepted Items</th>
          <th class="border border-gray-300 p-2 bg-black text-white">Rejected Items</th>
          <th class="border border-gray-300 p-2 bg-black text-white">Rejection Rate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="tableData.length === 0">
          <td class="border border-gray-300 p-2 text-center" colspan="5">No data available</td>
        </tr>
        <tr v-for="(line, index) in tableData" :key="index">
          <td class="border border-gray-300 p-2">
            <input
              v-model="line.name"
              type="text"
              class="border border-gray-400 p-1 w-full"
              :placeholder="'Line Name ' + (index + 1)"
            />
          </td>
          <td class="border border-gray-300 p-2">
            <input v-model="line.processed" type="text" class="border border-gray-400 p-1 w-full" />
          </td>
          <td class="border border-gray-300 p-2">
            <input v-model="line.accepted" type="text" class="border border-gray-400 p-1 w-full" />
          </td>
          <td class="border border-gray-300 p-2">
            <input v-model="line.rejected" type="text" class="border border-gray-400 p-1 w-full" />
          </td>
          <td class="border border-gray-300 p-2">
            <input v-model="line.rejectionRate" type="text" class="border border-gray-400 p-1 w-full" />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- ProductLine Component -->
    <ProductLine />
    <LiveView/>
  </div>
</template>

<script>
import ProductLine from '../components/ProductLine.vue';
import LiveView from '../components/LiveView.vue';
export default {
  components: {
    ProductLine,
    LiveView
  },
  data() {
    return {
      tableData: [
        { name: 'Line 1: Agric', processed: 100, accepted: 90, rejected: 10, rejectionRate: '10%' },
        { name: 'Line 2: Plastics', processed: 150, accepted: 145, rejected: 5, rejectionRate: '3.33%' },
        
      ],
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch("https://api.example.com/lines"); // Replace with your API URL
        const data = await response.json();
        this.tableData = data; // Assuming the API returns an array of line data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
