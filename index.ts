import { inject, reactive } from "vue";
import { nanoid } from "nanoid";

// Export WS alert type
export type WS_Alert = {
    id: string;
    type: string;
    icon: string;
    message: string;
    timeout?: number | false;
};

const WS_ALERTS = reactive<WS_Alert[]>([]);

function $closeAlert(id: string, alerts: WS_Alert[]) {
    const index = alerts.findIndex((a) => a.id === id);
    if (index > -1) alerts.splice(index, 1);
}

// Inject alerts
export function injectWsAlerts() {
    return inject<WS_Alert[]>("WS_ALERTS")!;
}

// Get alerts
export function getWsAlerts() {
    return WS_ALERTS;
}

// Use WS alerts
export function useWsAlerts() {
    const WS_ALERTS = injectWsAlerts();

    return {
        WS_ALERTS,
        closeAlert: (id: string) => $closeAlert(id, WS_ALERTS)
    };
}

function alert(data: Omit<WS_Alert, "id"> & { id?: string }) {
    if (!data.hasOwnProperty("id")) {
        data.id = nanoid(5);
    }

    const newAlert = Object.assign({ timeout: 5000 }, data) as WS_Alert;

    if (WS_ALERTS.length) {
        const findAlert = WS_ALERTS.findIndex((a) => {
            return a.type === data.type && a.message === data.message;
        });

        if (findAlert > -1) return;
    }

    WS_ALERTS.push(newAlert as WS_Alert);

    if (newAlert.timeout) {
        setTimeout(() => $closeAlert(newAlert.id, WS_ALERTS), newAlert.timeout);
    }
}

export const $alert = {
    success(message: string, options?: Partial<WS_Alert>) {
        alert(
            Object.assign(
                {
                    type: "success",
                    icon: "fa fa-check-circle",
                    message
                },
                options || {}
            )
        );
        return this;
    },

    info(message: string, options?: Partial<WS_Alert>) {
        alert(
            Object.assign(
                {
                    type: "info",
                    icon: "fa fa-info-circle",
                    message
                },
                options || {}
            )
        );
        return this;
    },

    warning(message: string, options?: Partial<WS_Alert>) {
        alert(
            Object.assign(
                {
                    type: "warning",
                    icon: "fa fa-exclamation-triangle",
                    message
                },
                options || {}
            )
        );
        return this;
    },

    error(message: string, options?: Partial<WS_Alert>) {
        alert(
            Object.assign(
                {
                    type: "error",
                    icon: "fa fa-bomb",
                    message
                },
                options || {}
            )
        );
        return this;
    }
};
