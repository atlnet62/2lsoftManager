module.exports = () => {
    return {
        verbose: true,
        "setupFilesAfterEnv": [
            "jest-extended/all"
        ],
    };
};
