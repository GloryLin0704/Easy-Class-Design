const express = require('express');
const router = express.Router();
const auth = require('../tools/auth');
const mysql = require('mysql');
const query = require('../tools/db/query');

router.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let findSql = 'SELECT * FROM users where username=' + mysql.escape(username)
        + 'and password=' + mysql.escape(password);

    query(findSql).then(result => {
        if (result.length === 0) {
            res.json({
                mess: '用户名不存在或密码错误'
            });
        } else {
            let token = auth.get(username);
            res.json({
                mess: '欢迎进入',
                token: token
            });
        }
    }).catch(err => {
        if (err) throw err;
    })
})

module.exports = router;
