const express = require('express');
const router = express.Router();
const auth = require('../tools/auth');
const { contactsModel, listModel } = require('../tools/db')


router.get('/', (req, res) => {
    let token = req.headers.authorization;
    let auth_info = auth.check(token)

    if (auth_info.data === 'root') {
        let name = req.query.name;

        whereStrL = { list_name: name };
        whereStrC = { contact: name }

        let array = [contactsModel.remove(whereStrC), listModel.remove(whereStrL)];

        Promise.all(array).then(suc => {
            res.json({
                suc
            })
        }).catch(err => {
            res.json({
                err
            })
        });
    } else {
        res.json({
            msg: '非管理员'
        })
    }

})

module.exports = router;

