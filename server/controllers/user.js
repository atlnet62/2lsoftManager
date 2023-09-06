import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/index.js";
import jwt from "jsonwebtoken";
import Model from "../models/model.js";
import { delDatas, insertDatas, searchDatas, selectOneData, selectAllDatas, updateDatas } from "./generic.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { folderManager, fragmentQueryConstruct, generateToken } from "../lib/genericFunction.js";

export const selectAllUser = async (request, response, next) => {
    const rows = "id, uuid, email, password_date, reset_password, alias, role_code, validation_account, register_date, avatar";
    const result = await selectAllDatas(request, response, next, rows, "user");
    return result;
};

export const selectUser = async (request, response, next) => {
    const { uuid } = request.params;

    const rows = "id, uuid, email, password_date, reset_password, alias, role_code, validation_account, register_date, avatar";

    const result = await selectOneData(request, response, next, rows, "user", "uuid", uuid);
    return result;
};

export const addUser = async (request, response, next) => {
    // init les variables d'entrée
    const { email, password } = request.body;

    // Cherche si l'email est deja das la base
    const checkDatas = await searchDatas(request, response, next, email, "email", "user", "email");
    if (checkDatas) {
        response.status(409).json({
            message: "User existing, impossible to create a new user.",
        });
        return;
    }

    try {
        bcrypt.hash(password, 10, async (error, hash) => {
            const uuidCreated = uuidv4();

            const userDatas = {
                uuid: uuidCreated,
                email: email,
                password: hash,
                alias: email.split("@")[0],
            };

            const rows = "uuid, email, password, password_date, reset_password, alias, role_code, validation_account, register_date, avatar";
            const values = ` ?, ?, ?, now(), 0, ?, 700, 0, now(), 'default.png'`;

            const result = await insertDatas(request, response, next, "user", values, rows, userDatas);

            console.log(response.statusCode);

            if (response.statusCode === 200) {
                if (uuidCreated) {
                    folderManager("create", `./server/public/datas/${uuidCreated}`);
                }
            }

            return result;
        });
    } catch (error) {
        return next(error);
    }
};

export const delUser = async (request, response, next) => {
    const uuid = request.params.userUUID;

    const checkDatas = await searchDatas(request, response, next, uuid, "email", "user", "uuid");
    if (!checkDatas) {
        response.status(409).json({
            message: "No user found.",
        });
        return;
    }

    const result = await delDatas(request, response, next, "user", "uuid", uuid);

    if (response.statusCode === 200) {
        if (uuid) {
            folderManager("delete", `./server/public/datas/${uuid}`);
        }
    }

    return result;
};

export const uptUser = async (request, response, next) => {
    let uuid = request.params.userUUID;

    // Cherche si l'email est deja das la base
    const checkDatas = await searchDatas(request, response, next, uuid, "email", "user", "uuid");

    if (!checkDatas) {
        response.status(409).json({
            message: "No user found.",
        });
        return;
    }

    // construct the query fragment for the query
    const fragmentQuery = fragmentQueryConstruct(request.body);

    const datas = request.body;
    datas.uuid = uuid;

    // execute the query and retur the result
    const result = await updateDatas(request, response, next, "user", fragmentQuery, "uuid", datas);
    return result;
};

export const signin = async (request, response, next) => {
    const { email, password } = request.body;

    const userDatas = {
        key: email,
        query: "SELECT * FROM user WHERE email = ?",
    };

    try {
        const result = await Model.getDataByKey(userDatas);
        const isSamePwd = result[0] ? await bcrypt.compare(password, result[0].password) : null;

        if (!result[0] || !isSamePwd) {
            response.status(404).json({
                message: "Bad Login or/and Password, Please try again.",
            });
            return;
        }

        const datas = {
            uuid: result[0].uuid,
            role_code: result[0].role_code,
            validation_account: result[0].validation_account,
        };

        const accessToken = generateToken(datas, ACCESS_TOKEN_SECRET, "15m");
        const refreshToken = generateToken(datas, REFRESH_TOKEN_SECRET, "24h");

        response.status(200).json({
            accessToken,
            refreshToken,
            isLogged: true,
        });
    } catch (error) {
        return next(error);
    }
};

export const refreshToken = async (request, response, next) => {
    const TOKEN = request.headers["x-refresh-token"];

    if (TOKEN === undefined || TOKEN === "null") {
        response.status(404).json({
            message: "Token not found",
        });
        return;
    } else {
        jwt.verify(TOKEN, REFRESH_TOKEN_SECRET, async (error, decoded) => {
            if (error) {
                response.status(401).json({
                    message: "Invalid Token",
                });
                return;
            } else {
                const result = await searchDatas(request, response, next, decoded.uuid, "role_code, validation_account", "user", "uuid");

                if (!result) {
                    response.status(409).json({
                        message: "User datas not found.",
                    });
                    return;
                }

                const datas = {
                    uuid: decoded.uuid,
                    role_code: result.role_code,
                    validation_account: result.validation_account,
                };

                const refreshedToken = generateToken(datas, ACCESS_TOKEN_SECRET, "15m");

                response.status(200).json({
                    accessToken: refreshedToken,
                });
            }
        });
    }
};
