import {Plugin, reactive} from "vue";
import type {WS_Alert} from "./index";
// @ts-ignore
import WsAlert from "./src/WsAlert.vue";

// Export plugin
export default <Plugin>{
    install(app) {
        // Create a reactive array to store the alerts
        const WS_ALERTS = reactive<WS_Alert[]>([]);

        // Provide the array to the app
        app.provide('WS_ALERTS', WS_ALERTS);

        // Load the component
        app.component(WsAlert.name, WsAlert);
    },
}