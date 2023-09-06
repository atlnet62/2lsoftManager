// Middleware to verify the role for the user to allow access on each route

/********
700 USER
755 MODO
777 ADMIN
*********/

export const isAdmin = (request, response, next) => {
    if (request.params.role_code === 777 && request.params.validation_account === 1) {
        next();
    } else {
        response.status(308).json({
            isNotAdmin: true,
        });
    }
};

export const isModo = (request, response, next) => {
    if (request.params.role_code === 777 || (request.params.role_code === 755 && request.params.validation_account === 1)) {
        next();
    } else {
        response.status(308).json({
            isNotModo: true,
        });
    }
};

export const isUser = (request, response, next) => {
    if ((request.params.role_code === 777 || request.params.role_code === 755 || request.params.role_code === 700) && request.params.validation_account === 1) {
        next();
    } else {
        response.status(308).json({
            isNotUser: true,
        });
    }
};
