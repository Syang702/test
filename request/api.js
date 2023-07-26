import request from "./request";


/*  开关
    plcCode: 380,
    open: 1,
    deviceCode: 8,
*/
export function operaDevice(data) {
    return request({
        url: "action/operaDevice",
        method: "POST",
        data,
    });
}

/*
    sensorNum  传感器编号
    plcNum  plc编号
*/
export function findSensorNumData(data) {
    return request({
        url: "action/findSensorNumData",
        method: "POST",
        data,
    });
}

/*
    plcId  plc编号
*/
export function findDeviceLogData(data) {
    return request({
        url: "action/findDeviceLogData",
        method: "POST",
        data,
    });
}



