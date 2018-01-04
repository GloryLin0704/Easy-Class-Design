const connection = require('./config');

let del = (delSql) => {
    return new Promise((res, rej) => {
        connection.query(delSql, (err, result) => {
            if(err) rej(err);
            res(result)
        })
    })
}

module.exports = del