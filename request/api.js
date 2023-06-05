import request from "./request";

export function operaDevice(data) {
    return request({
        url: "action/operaDevice",
        method: "POST",
        data,
    });
}
