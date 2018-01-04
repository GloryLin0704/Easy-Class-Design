const connection = require('./config');

connection.connect();

let find = sql => {
    return new Promise((res, rej) => {
        connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                rej(err);
            } else {
                res(result);
            }
        })
    })
}

module.exports = find;