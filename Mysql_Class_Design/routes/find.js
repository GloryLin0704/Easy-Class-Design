const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const find = require('../tools/db/query');
const auth = require('../tools/auth');


router.get('/', (req, res) => {
    let token = req.headers.authorization;
    let auth_info = auth.check(token)

    if (auth_info.data != '') {
        let tofind = req.query.someone;

        let findSql = [
            'SELECT * FROM students,college WHERE campus LIKE \'%' + tofind + '%\'' + ' AND students.cono=college.cono',
            'SELECT * FROM students,college WHERE s_no LIKE \'%' + tofind + '%\'' + ' AND students.cono=college.cono',
            'SELECT * FROM students,college WHERE class_no LIKE \'%' + tofind + '%\'' + ' AND students.cono=college.cono',
            'SELECT * FROM students,college WHERE sname LIKE \'%' + tofind + '%\'' + ' AND students.cono=college.cono',
            'SELECT * FROM students,college WHERE coname LIKE \'%' + tofind + '%\'' + ' AND students.cono=college.cono',
        ];

        let sql = [];

        findSql.map(e => {
            sql.push(find(e))
        })

        Promise.all(sql).then(result => {
            // for (var i = 0; i < 5; i++) {
            //     console.log(i)
            //     if (i === 4) {
            //         res.json({
            //             msg: '查询结束',
            //             data: result[i]
            //         })
            //     }
            //     if (result[i].length != 0) {
            //         res.json({
            //             msg: '查询结束',
            //             data: result[i]
            //         })
            //         break;
            //     }
            // }
            res.json({
                msg: '查询结束',
                data: result
            })          //返回的结果result是一个数组里面有五个数组，遍历数组，去重
        }).catch(err => {
            console.log(err);
            res.json({
                err
            })
        })

    } else {
        res.json({
            mess: '非管理员'
        });
    }
})


module.exports = router;