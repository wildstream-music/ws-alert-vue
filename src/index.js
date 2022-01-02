import { reactive } from "vue";
import { nanoid } from "nanoid";
export const Alerts = reactive([]);
export function closeAlert(id) {
    const index = Alerts.findIndex((a) => a.id === id);
    if (index > -1)
        Alerts.splice(index, 1);
}
function alert(data) {
    const newAlert = {
        id: nanoid(5),
        timeout: 5000,
        ...data
    };
    if (Alerts.length) {
        const findAlert = Alerts.findIndex((a) => {
            return a.type === data.type && a.message === data.message;
        });
        if (findAlert > -1)
            return;
    }
    Alerts.push(newAlert);
    if (newAlert.timeout) {
        setTimeout(() => closeAlert(newAlert.id), newAlert.timeout);
    }
}
export const $alert = {
    success(message, options) {
        alert({
            type: "success",
            icon: "fa fa-check-circle",
            message,
            ...(options || {})
        });
        return this;
    },
    info(message, options) {
        alert({
            type: "info",
            icon: "fa fa-info-circle",
            message,
            ...(options || {})
        });
        return this;
    },
    warning(message, options) {
        alert({
            type: "warning",
            icon: "fa fa-exclamation-triangle",
            message,
            ...(options || {})
        });
        return this;
    },
    error(message, options) {
        alert({
            type: "error",
            icon: "fa fa-bomb",
            message,
            ...(options || {})
        });
        return this;
    }
};
