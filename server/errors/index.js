export const errorHandler = (error, request, response) => {

    if (ENV === 'development' && !error.errno) {
        response.status(error.code).json({
            errorCode: error.code,
            errorMessage: error.message,
        });

    } else {

        response.status(500).json({
            status: "500",
            message: "We have some connection problems with the database.",
        });

    }
};
