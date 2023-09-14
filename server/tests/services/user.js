import axios from "axios";
import { BACKURL } from "../../config/index";

export const signin = async (datas) => {
    return await axios.post(`${BACKURL}/user/signin`, datas)
    .then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    })
};

export const refToken = async (aToken, rToken, datas) => {
    return await axios.post(`${BACKURL}/user/refreshToken`, datas, {
        headers: {
            "x-access-token": aToken,
            "x-refresh-token": rToken,
        },
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    })
};

export const selectUser = async (token, uuid) => {
    return await axios.get(`${BACKURL}/user/select/${uuid}`, {
        headers: { "x-access-token": token },
    })
    .then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    })
};

export const selectAllUser = async (token) => {
    return await axios.get(`${BACKURL}/user/all`, {
        headers: { "x-access-token": token },
    })
    .then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    })
};

export const addUser = async (datas) => {
    return await axios.post(`${BACKURL}/user/add`, datas)
    .then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    })
};

export const delUser = async (token, uuid) => {
    return await axios.delete(`${BACKURL}/user/del/${uuid}`, {
        headers: { "x-access-token": token },
    })
    .then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    })
};

export const updUser = async (token, uuid, datas) => {
    return await axios.patch(`${BACKURL}/user/upt/${uuid}`, datas, {
        headers: { "x-access-token": token },
    })    
    .then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    })
};
