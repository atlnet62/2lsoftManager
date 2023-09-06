import mysql from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_USER, DB_PWD, DB_PORT, ENV } from "./../config/index.js";

let dbNameWithExt = DB_NAME;

if (ENV === "development") {
    dbNameWithExt += `_dev`;
}

const pool = mysql.createPool({
    host: DB_HOST,
    database: dbNameWithExt,
    user: DB_USER,
    password: DB_PWD,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10000,
    queueLimit: 0,
});

/* debug session */
pool.getConnection()
    .then((response) => {
        console.log(`Connected to database : [${response.config.database}]`);
    })
    .catch((error) => {
        console.log(error);
    });

export default pool;
