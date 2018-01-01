const express = require('express');
const router = express.Router();
const auth = require('../tools/auth');

router.all('*', (req, res, next) => {
    let token = req.headers.authorization;
    let auth_info = auth.check(token);

    if (auth_info) next();
    else {
        res.json({
            mess: 'token无效过过期，请重新登录'
        })
    }
})

module.exports = router;