const express = require('express');
const router = express.Router();
const mysql = require('mysql')
const insert = require('../tools/db/insert');
const find = require('../tools/db/query');

router.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let findSql = 'SELECT * FROM users where username=' + mysql.escape(username);

    let addSql = 'INSERT INTO users(Id,username,password) VALUES(0,?,?)';
    let addSqlParams = [username, password];

    find(findSql).then(result => {
        if (result.length === 0)
            return insert(addSql, addSqlParams).then(todo => {
                res.json({
                    mess: '注册成功'
                });
            });
        else {
            res.json({
                mess: '该用户已存在'
            })
        }
    }).catch(err => {
        if (err) console.log(err)
    })
})

module.exports = router;