export const pageNotFound = (request, response, next) => {
    try {
        response.status(404).json({
            message: "Error 404 : Page not Found !",
        });
    } catch (error) {
        return next(error);
    }
};