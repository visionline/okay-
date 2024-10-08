<template>
  <div class="flex-grow px-6 relative">
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

    <!-- Main Content Area -->
    <ProductLine />
  </div>
</template>

<script>
import ProductLine from '../components/ProductLine.vue';

export default {
  components: {
    ProductLine,
  },
};
</script>
