const connection = require('./config');

let insert = (sql, sqlParams) => {
    return new Promise((res, rej) => {
        connection.query(sql, sqlParams, (err, result) => {
            if (err) {
                console.log(err);
                rej(err);
            } else {
                res(result);
            }
        })
    })
}

module.exports = insert;