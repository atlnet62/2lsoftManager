export const homepage = (request, response, next) => {
    try {
        response.status(200).json({
            title: "homepage",
            article: "welcome on 2lsoft.fr homepage",
        });
    } catch (error) {
        return next(error);
    }
};