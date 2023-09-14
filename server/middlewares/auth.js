import jwt, { decode } from "jsonwebtoken";
const { ACCESS_TOKEN_SECRET } = process.env;

// verify jwt

export const isAdmin = (request, response, next) => {
    const TOKEN = request.headers["x-access-token"];

    if (TOKEN === undefined || TOKEN === "null") {
        response.status(404).json({
            isError: true,
            message: "Token not found",
        });
        return;
    } else {
        jwt.verify(TOKEN, ACCESS_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                response.status(401).json({
                    isError: true,
                    message: "Invalid Token",
                });
                return;
            } else {
                if (decoded.validation_account !== 1) {
                    response.status(401).json({
                        isError: true,
                        message: "Your account is deactivate.",
                    });
                    return;
                }

                if (decoded.role_code !== 777) {
                    response.status(401).json({
                        isError: true,
                        message: "You are not allowed to do this action.",
                    });
                    return;
                }
                next();
            }
        });
    }
};

export const isModo = (request, response, next) => {
    const TOKEN = request.headers["x-access-token"];

    if (TOKEN === undefined || TOKEN === "null") {
        response.status(404).json({
            isError: true,
            message: "Token not found",
        });
        return;
    } else {
        jwt.verify(TOKEN, ACCESS_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                response.status(401).json({
                    isError: true,
                    message: "Invalid Token",
                });
                return;
            } else {
                if (decoded.validation_account !== 1) {
                    response.status(401).json({
                        isError: true,
                        message: "Your account is deactivate.",
                    });
                    return;
                }

                if (decoded.role_code !== 755 && decoded.role_code !== 700) {
                    response.status(401).json({
                        isError: true,
                        message: "You are not allowed to do this action.",
                    });
                    return;
                }
                next();
            }
        });
    }
};

export const isUser = (request, response, next) => {
    const TOKEN = request.headers["x-access-token"];

    if (TOKEN === undefined || TOKEN === "null") {
        response.status(404).json({
            isError: true,
            message: "Token not found",
        });
        return;
    } else {
        jwt.verify(TOKEN, ACCESS_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                response.status(401).json({
                    isError: true,
                    message: "Invalid Token",
                });
                return;
            } else {
                if (decoded.validation_account !== 1) {
                    response.status(401).json({
                        isError: true,
                        message: "Your account is deactivate.",
                    });
                    return;
                }

                if (decoded.role_code !== 777 && decoded.role_code !== 755 && decoded.role_code !== 700) {
                    response.status(401).json({
                        isError: true,
                        message: "You are not allowed to do this action.",
                    });
                    return;
                }
                next();
            }
        });
    }
};
