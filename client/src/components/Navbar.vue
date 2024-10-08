<template>
    <nav
      class="hidden lg:block relative z-50 flex flex-col bg-[#33333312] overflow-auto"
      style="width: 269px; height: 1773px; top: 3px; gap: 0px; opacity: 0px"
    >
      <div
        class="flex items-center justify-center mb-8 bg-blue-200"
        style="margin-top: 76px"
      >
        <a class="inline-flex items-center h-8 k2d-regular text-2xl" href="#">
          <span
            style="
              font-family: K2D;
              font-size: 36px;
              font-weight: 800;
              line-height: 46.8px;
              text-align: left;
            "
            >visi</span
          ><img
            src="/public/eye.png"
            alt="Logo"
            class="h-8 logo-img"
            style="
              
            "
          />
          <span
            style="
              
            "
            >n line
          </span>
        </a>
      </div>
      <!-- Navigation Items -->
      <ul class="space-y-4 text-center" style="font-size: 20px">
        <li
          style="
            width: 269px;
            height: 54px;
            top: 169px;
            padding: 12px 127px 12px 28px;
            gap: 0px;
            opacity: 0px;
            background: #000000;
          "
        >
          <a class="text-white k2d-regular" href="/" style="">Dashboard</a>
        </li>
        <li><a class="text-black k2d-regular" href="/configuration">Configuration</a></li>
        <li><a class="text-black k2d-regular" href="live-monitoring">Live Monitoring</a></li>
        <li><a class="text-black k2d-regular" href="production-line">Production Line</a></li>
        
      </ul>
    </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=K2D:wght@100;200;300;400;500;600;700;800&display=swap");

.k2d-regular {
  font-family: "K2D", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.flex {
  display: flex;
}

.h-screen {
  height: 100vh;
}

.flex-grow {
  flex-grow: 1;
}

.absolute {
  position: absolute;
}

.top-4 {
  top: 1rem; /* Adjust as necessary */
}

.right-4 {
  right: 1rem; /* Adjust as necessary */
}

.bg-play-600 {
  background-color: #e3342f; /* Tailwind play-600 */
}

.rounded-full {
  border-radius: 9999px; /* Fully rounded */
}
.note{
font-family: K2D;
              font-size: 36px;
              font-weight: 600;
              line-height: 46.8px;
              text-align: left;
}
.logo-img{width: 43px;
              height: 43px;

              left: 96px;
              gap: 0px;
              opacity: 0px;}
</style>
