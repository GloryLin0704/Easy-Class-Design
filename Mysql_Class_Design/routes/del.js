const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const del = require('../tools/db/delete');
const auth = require('../tools/auth');

router.get('/', (req, res) => {
    let token = req.headers.authorization;
    let auth_info = auth.check(token)

    if (auth_info.data === 'root') {
        let s_no = req.query.s_no;

        let delSql = 'DELETE FROM students where s_no=' + mysql.escape(s_no)

        del(delSql).then(result => {
            if (result.affectedRows === 1) {
                res.json({
                    msg: '删除成功'
                })
            }
        }).catch(err => {
            if (err) throw err;
        })

    } else {
        res.json({
            mess: '非管理员'
        });
    }
})

module.exports = router;