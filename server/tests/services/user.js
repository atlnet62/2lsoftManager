import axios from "axios";
import { BACKURL } from "../../config/index";

export const signin = async (datas) => {
    const query = await axios.post(`${BACKURL}/user/signin`, datas);
    return query;
};

export const refToken = async (aToken, rToken, datas) => {

    const query = await axios.post(`${BACKURL}/user/refreshToken`, datas, {
        headers: { 
            "x-access-token": aToken, 
            "x-refresh-token": rToken 
        },
    });

    return query;
};

export const selectUser = async (token, uuid) => {
    const query = await axios.get(`${BACKURL}/user/select/${uuid}`, {
        headers: { "x-access-token": token },
    });
    return query;
};

export const selectAllUser = async (token) => {
    const query = await axios.get(`${BACKURL}/user/all`, {
        headers: { "x-access-token": token },
    });
    return query;
};

export const addUser = async (datas) => {
    const query = await axios.post(`${BACKURL}/user/add`, datas);
    return query;
};

export const delUser = async (token, uuid) => {
    const query = await axios.delete(`${BACKURL}/user/del/${uuid}`, {
        headers: { "x-access-token": token },
    });
    return query;
};

export const updUser = async (token, uuid, datas) => {
    const query = await axios.patch(`${BACKURL}/user/upt/${uuid}`, datas, {
        headers: { "x-access-token": token },
    });
    return query;
};

