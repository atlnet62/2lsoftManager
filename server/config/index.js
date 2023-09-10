// Port export
// process.env.PORT ==> pour heroku // deploiement
export const PORT = process.env.PORT || process.env.LOCAL_PORT;

export const ENV = process.env.NODE_ENV || "noEnv";

// Config for bdd
export const { DB_HOST, DB_NAME, DB_USER, DB_PWD, DB_PORT } = process.env;

// config for jwt
export const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

//export const BACKURL = "https://2lsoft.fr";
export const BACKURL = "http://localhost:9000/api/v1";

