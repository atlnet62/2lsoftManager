import pool from "../database/db.js";

// Models in link with the controllers folders (MVC)

class Model {
    static async getAllDatas(query) {
        const [result] = await pool.execute(query);
        return result;
    }

    static async getDataByKey({ query, key }) {
        const [result] = await pool.execute(query, [key]);
        return result;
    }

    static async removeDataByKey({ query, key }) {
        const [result] = await pool.execute(query, [key]);
        return result;
    }

    static async getDataByKeys({ query, keyOne, keyTwo }) {
        const [result] = await pool.execute(query, [keyOne, keyTwo]);
        return result;
    }

    static async removeDataByKeys({ query, keyOne, keyTwo }) {
        const [result] = await pool.execute(query, [keyOne, keyTwo]);
        return result;
    }

    static async saveData(query, datas) {
        const [result] = await pool.execute(query, [...Object.values(datas)]);
        return result;
    }
}

export default Model;
