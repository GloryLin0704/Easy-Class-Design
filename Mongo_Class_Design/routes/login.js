const express = require('express');
const router = express.Router();
const auth = require('../tools/auth');
const { userModel } = require('../tools/db')

router.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let data = {
        user_name: username,
        user_password: password
    }

    userModel.find(data).then(result => {
        let token = auth.get(username);
        res.json({
            msg: '欢迎进入',
            token: token
        });
    }).catch(err => {
        res.json({
            err
        })
    })

})

module.exports = router;
