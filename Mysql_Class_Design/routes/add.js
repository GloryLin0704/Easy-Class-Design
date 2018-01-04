const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const auth = require('../tools/auth');
const insert = require('../tools/db/insert');
const find = require('../tools/db/query');

router.post('/', (req, res) => {
    let token = req.headers.authorization;
    let auth_info = auth.check(token)
    console.log(auth_info)

    if (auth_info.data === 'root') {
        let s_no = req.body.s_no;   //学号
        let sname = req.body.sname;       //姓名
        let sex = req.body.sex;         //性别
        let class_no = req.body.class_no;     //班级
        let p_code = req.body.p_code;         //联系电话
        let parent_pcode = req.body.parent_pcode;       //家长电话
        let h_address = req.body.h_address; //家庭住址
        let m_address = req.body.m_address;     //邮箱
        let spno = req.body.spno;       //专业编码
        let cono = req.body.cono        //专业名称

        let addSql = 'INSERT INTO students(s_no,sname,sex,class_no,p_code,parent_pcode,h_address,m_address,spno,cono) VALUES(?,?,?,?,?,?,?,?,?,?)';
        let addSqlParams = [s_no, sname, sex, class_no, p_code, parent_pcode, h_address, m_address, spno, cono];

        let findSql = 'SELECT * FROM students where s_no=' + mysql.escape(s_no);

        find(findSql).then(result => {
            if (result.length === 0) {
                return insert(addSql, addSqlParams).then(todo => {
                    res.json({
                        mess: '增加完成'
                    })
                })
            } else {
                res.json({
                    mess: '该学生信息已存在'
                })
            }
        }).catch(err => {
            res.json({
                msg: '错误',
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