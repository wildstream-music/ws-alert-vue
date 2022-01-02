import { Plugin } from "vue";
import { getWsAlerts } from "./index";
// @ts-ignore
import WsAlert from "./src/WsAlert.vue";

// Export plugin
export default <Plugin>{
    install(app) {
        // Provide the array to the app
        app.provide("WS_ALERTS", getWsAlerts());

        // Load the component
        app.component(WsAlert.name, WsAlert);
    }
};
