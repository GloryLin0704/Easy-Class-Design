const jwt = require('jsonwebtoken');
const SECRET = `This_Is_Secret_Key`;

let auth = {};

auth.get = function (data) {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 99000000,
        data: data
    }, SECRET);
}

auth.check = token => {
    let data;

    try {
        data = jwt.verify(token, SECRET);
        return data;
    } catch (err) {
        return false;
    }

    return data;
}

module.exports = auth;