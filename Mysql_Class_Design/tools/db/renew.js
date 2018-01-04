const connection = require('./config');

let update = (modSql, modSqlParams) => {
    return new Promise((res, rej) => {
        connection.query(modSql, modSqlParams, (err, result) => {
            if (err) {
                console.log(err);
                rej(err);
            }
            res(result);
        })
    })
}

module.exports = update;