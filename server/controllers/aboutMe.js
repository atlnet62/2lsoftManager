export const aboutMe = (request, response, next) => {
    try {
        response.status(200).json({
            title: "a propos",
            article: "lorem ipsum bla bla",
            author: "auteur : Ludovic LAREU",
        });
    } catch (error) {
        return next(error);
    }
};