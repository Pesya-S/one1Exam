const mysql = require('mysql');

const database='contactDB'

const dbc      =    mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database :database,
    multipleStatements: true,
    debug    :  false
});  

const getTable = (tableName) => {
    return new Promise((resolve, reject) => {
        dbc.query(`select * from ${tableName}`, (err, rows) => {
            if (err) console.log(err);
            resolve([rows,err]);
        });
    });
}

const insert = (tableName, object) => {
    return new Promise((resolve, reject) => {
        dbc.query(`insert into ${tableName} set ?`, object, (err, result) => {
            if (err) console.log(err);
            let id = result ? result.insertId : -1
            resolve([id,err]);
        });
    });
}
const update = (tableName, object) => {
    return new Promise(async(resolve, reject) => {
        const columns = Object.keys(object);
        const values = Object.values(object);
        let id = object.id
        let sql = `UPDATE ${tableName} SET ` + columns.join(" = ? ,") + " = ?" + ` where id=` + id;
        dbc.query(sql, values, (err, result) => {
            if (err) console.log(err);
            resolve([result,err]);
        });
    });
}

const deleted=(nameTalbe,id)=>{
    return new Promise(async(resolve,reject)=>{
        let sql=`delete from ${nameTalbe} where id=${id}`;
        dbc.query(sql,(err,result)=>{
            if (err) console.log(err);
            resolve([result,err]);
        })
    })
}

const getById = async (tableName, idValue) => {
    return new Promise((resolve, reject) => {
        dbc.query(`select * from ${tableName} where id=?`, idValue, (err, rows) => {
            resolve([rows && rows[0] ? rows[0] : null,err]);
        })
    })
}
module.exports = {
    getTable, insert, update,deleted,getById
}