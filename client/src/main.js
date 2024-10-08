import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router"; // Import Vue Router
import Dashboard from "./views/Dashboard.vue";
import Configuration from "./views/Configuration.vue";
import LiveMonitoring from "./views/LiveMonitoring.vue";
import ProductionLine from "./views/ProductionLine.vue";
import ParameterSettings from "./views/ParameterSettings.vue";
import Settings from "./views/Settings.vue";
import "./style.css";
// Define your routes
const routes = [
  { path: "/", component: Dashboard },
  { path: "/configuration", component: Configuration },
  { path: "/live-monitoring", component: LiveMonitoring },
  { path: "/production-line", component: ProductionLine },
  { path: "/parameter-settings", component: ParameterSettings },
  { path: "/settings", component: Settings },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(), // Use the HTML5 history mode
  routes,
});

const app = createApp(App);

// Use the router
app.use(router);

app.mount("#app");
