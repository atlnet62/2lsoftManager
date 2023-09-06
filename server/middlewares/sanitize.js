export const sanitize = (request, response, next) => {

    let sanitizeIsOK = true;

    const regexUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regexAlias = /^[a-zA-Z0-9_]{3,30}$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@,$!%*?&])[A-Za-z\d@,$!%*?&]{8,}$/;
    const regexNumber = /^([0-9]){0,11}$/;
    const regexText = /^[\p{L}\sàâäçéèêëîïôöùûüÿœæÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸŒÆ\-\/]+$/u;  // /^([0-9a-zA-Z_ ]){0,}$/;

    const { uuid } = request.params || request.body;
    const { email, password, alias, role_code, validation_account } = request.body;

    const verifyChar = (nom, element, regex, min, max) => {
        if (element) {

            if (element.length > max || element.length < min) {
                response.status(400).json({
                    message: `The character limit is out min/max. please could you verify the field: ${nom}`,
                });
                sanitizeIsOK = false;
                return;
            }

            if (!regex.test(element)) {
                response.status(400).json({
                    message: `Character(s) not allowed on the field : ${nom}`,
                });
                sanitizeIsOK = false;
                return;
            }

        }
    };


    if (uuid) {
        verifyChar("uuid", uuid, regexUUID, 4, 255);
    }

    if (email) {
        verifyChar("email", email, regexEmail, 4, 60);
    }

    if (alias) {
        verifyChar("username", username, regexAlias, 4, 60);
    }

    if (password) {
        verifyChar("password", password, regexPassword, 8, 32);
    }

    if (role_code) {
        verifyChar("role_code", role_code, regexNumber, 3, 3);
    }

    if (validation_account) {
        verifyChar("validation_account", validation_account, regexNumber, 1, 1);
    }


    if (sanitizeIsOK) {
        next();
    }

};