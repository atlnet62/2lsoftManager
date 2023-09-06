import fs from "fs";
import jwt from "jsonwebtoken";

export const checkEnv = (env, error) => {
    if (env === "production") {
        error = "We have some connection problems with the database.";
    } else {
        console.log("env est en dev")
    }
    return error;
}

export const folderManager = (type, path) => {

    if (type === 'create') {
        fs.access(path, (error) => {
            if (error) {
                fs.mkdir(path, { recursive: true }, (error) => {
                    if (error) {
                        return checkEnv(ENV, error);
                    }
                });
            }
        });
    }

    if (type === 'delete') {
        fs.access(path, (error) => {
            if (error) {
                return checkEnv(error);
            } else {
                fs.rm(path, { recursive: true }, (error) => {
                    if (error) {
                        return checkEnv(ENV, error);
                    }
                });
            }
        });
    }
}

export const fragmentQueryConstruct = (data) => {
    let fragmentQuery = "";
    for (const [row, value] of Object.entries(data)) {
        if (fragmentQuery !== "") {
            fragmentQuery += ", ";
        }
        fragmentQuery += `${row} = ?`;
    }
    return fragmentQuery;
}

export const generateToken = (datas, token, duration) => {

    return jwt.sign(
        datas,
        token,
        {
            expiresIn: duration,
        }
    );
    
}