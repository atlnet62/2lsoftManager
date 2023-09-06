import axios from 'axios';

export const signin = async (datas) => {
        const query = await axios.post(`http://localhost:9000/api/v1/user/signin`, datas);
        return query;
};


export const addUser = async (datas) => {
        const query = await axios.post(`http://localhost:9000/api/v1/user/add`, datas);
        return query;
}
