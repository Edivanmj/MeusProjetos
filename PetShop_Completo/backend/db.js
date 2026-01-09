const mysql = require("mysql2");
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Edivan123@",
    database: "PetShop"
});
module.exports = db;