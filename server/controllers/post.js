import { fragmentQueryConstruct } from "../lib/genericFunction.js";
import Model from "../models/model.js";
import { searchDatas } from "./generic.js";

export const selectAllPost = async (request, response, next) => {
    const query = `
            SELECT post_id AS postId, post.author, post.title AS postName, post.content, post.date, GROUP_CONCAT(category.title SEPARATOR ' ') AS tagName 
            FROM post 
            JOIN post_category ON post_category.post_id = post.id 
            JOIN category ON post_category.category_id = category.id
            GROUP BY post_id
        `;

    try {
        const result = await Model.getAllDatas(query);

        if (!result[0]) {
            response.status(404).json({
                isError: false,
                message: `No existing datas`,
            });
            return;
        } else {
            response.status(200).json({
                isRetrieved: true,
                datas: result,
            });
            return;
        }
    } catch (error) {
        return next(error);
    }
};

export const selectOnePost = async (request, response, next) => {
    const datas = {
        key: request.params.postId,
        query: `
        SELECT post_id AS postId, post.author, post.title AS postName, post.content, post.date, GROUP_CONCAT(category.title SEPARATOR ' ') AS tagName 
        FROM post 
        JOIN post_category ON post_category.post_id = post.id 
        JOIN category ON post_category.category_id = category.id
        WHERE post.id = ?
    `,
    };

    try {
        const result = await Model.getDataByKey(datas);

        if (!result[0]) {
            response.status(404).json({
                isError: false,
                message: `No existing datas`,
            });
            return;
        } else {
            response.status(200).json({
                isRetrieved: true,
                datas: result,
            });
            return;
        }
    } catch (error) {
        return next(error);
    }
};

export const insertOnePost = async (request, response, next) => {
    const { title, content, categories, uuid } = request.body;

    const datas = {
        author: uuid,
        title: title,
        content: content,
    };

    const query = `INSERT INTO post (author, title, content, date) VALUES (?, ?, ?, now())`;

    try {
        const result = await Model.saveData(query, datas);

        if (!result.insertId) {
            response.status(404).json({
                isError: true,
                message: `Problem to insert the post inside the BDD.`,
            });
            return;
        } else {
            const postIdInserted = result.insertId;
            categories.forEach(async (category) => {
                const query = `INSERT INTO post_category (post_id, category_id) VALUES (?, ?)`;

                try {
                    const result = await Model.saveData(query, { post_id: postIdInserted, category_id: category });
                    if (!result) {
                        response.status(404).json({
                            isError: true,
                            message: `Problem to insert the post inside the BDD.`,
                        });
                        return;
                    }
                } catch (error) {
                    next(error);
                }
            });
            response.status(404).json({
                isCreated: true,
                message: `The post published.`,
            });
            return;
        }
    } catch (error) {
        next(error);
    }
};

export const deleteOnePost = async (request, response, next) => {
    const id = request.params.postId;

    // Cherche si l'email est deja das la base
    const checkDatas = await searchDatas(request, response, next, id, "title", "post", "id");

    if (!checkDatas) {
        response.status(409).json({
            iseError: true,
            message: "No datas found.",
        });
        return;
    }

    const datas = {
        key: id,
        query: `DELETE post, post_category FROM post JOIN post_category ON post.id = post_category.post_id WHERE id = ?`,
    };

    try {
        await Model.removeDataByKey(datas);

        response.status(200).json({
            isDeleted: true,
        });
    } catch (error) {
        return next(error);
    }
};

export const updateOnePost = async (request, response, next) => {
    const id = request.params.postId;

    // Cherche si l'email est deja das la base
    const checkDatas = await searchDatas(request, response, next, id, "title", "post", "id");

    if (!checkDatas) {
        response.status(409).json({
            isError: true,
            message: "No datas found.",
        });
        return;
    }

    const fragmentQuery = fragmentQueryConstruct(request.body);

    const datas = request.body;
    datas.id = id;

    const query = `UPDATE post SET ${fragmentQuery} WHERE id = ?`;

    try {
        const result = await Model.saveData(query, datas);

        if (!result) {
            response.status(400).json({
                isError: true,
            });
        } else {
            response.status(200).json({
                isUpdated: true,
            });
        }
    } catch (error) {
        return next(error);
    }
};
