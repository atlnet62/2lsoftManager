import axios from "axios";
import { BACKURL } from "../../config/index";

export const selectAllPost = async (token) => {
    return await axios.get(`${BACKURL}/post/all`, {
        headers: { "x-access-token": token },
    })
    .then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    })
};

export const insertOnePost = async (token, datas) => {
    return await axios.post(`${BACKURL}/post/add`, datas, {
        headers: { "x-access-token": token },
    })
    .then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    })
};

export const selectOnePost = async (token, id) => {
    return await axios.get(`${BACKURL}/post/select/${id}`, {
        headers: { "x-access-token": token },
    })
    .then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    })
};