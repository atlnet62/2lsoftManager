import Model from "../models/model.js";

export const searchDatas = async (request, response, next, value, column, table, key) => {
    const datas = {
        key: value,
        query: `SELECT ${column} FROM ${table} WHERE ${key} = ?`,
    };
    try {
        const result = await Model.getDataByKey(datas);
        if (result[0]) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return next(error);
    }
};

export const selectAllDatas = async (request, response, next, rows, table) => {
    const query = `SELECT ${rows} FROM ${table}`;

    try {
        return await Model.getAllDatas(query);

    } catch (error) {
        return next(error);
    }
};

export const selectOneData = async (request, response, next, rows, table, key, value) => {
    const datas = {
        key: value,
        query: `SELECT ${rows} FROM ${table} WHERE ${key} = ?`,
    };

    try {
        return await Model.getDataByKey(datas);

    } catch (error) {
        return next(error);
    }
};

export const updateDatas = async (request, response, next, table, fragmentQuery, key, datas) => {
    const query = `UPDATE ${table} SET ${fragmentQuery} WHERE ${key} = ?`;

    try {
        await Model.saveData(query, datas);
        return true;

    } catch (error) {
        return next(error);
    }
};

export const insertDatas = async (request, response, next, table, values, rows, datas) => {
    const query = `INSERT INTO ${table} (${rows}) VALUES (${values})`;

    try {
        await Model.saveData(query, datas);
        return true;
        
    } catch (error) {
        return next(error);
    }
};

export const delDatas = async (request, response, next, table, key, value) => {
    const datas = {
        key: value,
        query: `DELETE FROM ${table} WHERE ${key} = ?`,
    };

    try {
        await Model.removeDataByKey(datas);
        return true;
    } catch (error) {
        return next(error);
    }
};
