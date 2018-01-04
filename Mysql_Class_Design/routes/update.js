const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const renew = require('../tools/db/renew');
const auth = require('../tools/auth');


router.post('/', (req, res) => {
    let token = req.headers.authorization;
    let auth_info = auth.check(token)

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

        let modSql = 'UPDATE students SET sname=?,sex=?,class_no=?,p_code=?,parent_pcode=?,h_address=?,m_address=?,spno=?,cono=? WHERE s_no=?'
        let modSqlParams = [sname, sex, class_no, p_code, parent_pcode, h_address, m_address, spno, cono, s_no];

        renew(modSql, modSqlParams).then(result => {
            if (result.affectedRows === 1) {
                res.json({
                    msg: '修改信息完成'
                });
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