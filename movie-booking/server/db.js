import mysql from "mysql";

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"busdb"
});

db.connect((err) =>{
    if(err) throw err;
    console.log("MySQL connected");
});

export default db;