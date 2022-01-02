import {Plugin, reactive} from "vue";
import type {WS_Alert} from "./index";
// @ts-ignore
import WsAlert from "./src/WsAlert.vue";

export default <Plugin>{
    install(app) {
        const WS_ALERTS = reactive<WS_Alert[]>([]);
        app.provide('WS_ALERTS', WS_ALERTS);
        app.component(WsAlert.name, WsAlert);
    },
}