const express = require('express');
const router = express.Router();
const { userModel } = require('../tools/db')

router.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let data = new userModel({
        user_name: username,
        user_password: password
    })

    userModel.find({ user_name: username }).then(result => {
        if (result.length === 0) {
            data.save().then(suc => {
                res.json({
                    msg: '注册成功'
                })
            }).catch(err => {
                res.json({
                    err
                })
            })
        } else {
            res.json({
                msg: '该用户与存在'
            })
        }
    }).catch(err => {
        res.json({
            err
        })
    })

})

module.exports = router;