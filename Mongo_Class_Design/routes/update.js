const express = require('express');
const router = express.Router();
const auth = require('../tools/auth');
const { listModel } = require('../tools/db')

router.post('/', (req, res) => {
    let token = req.headers.authorization;
    let auth_info = auth.check(token)

    if (auth_info.data === 'root') {
        let name = req.body.name;
        let sex = req.body.sex;
        let mobile = req.body.mobile;
        let birthday = req.body.birthday;
        let address = req.body.address;
        let family_number = req.body.family_number;
        let family_address = req.body.family_address;

        let list_data = ({
            list_sex: sex,
            lise_mobile_number: mobile,
            list_birthday: birthday,
            list_address: address,
            list_family_number: family_number,
            list_family_address: family_address
        })


        listModel.update({ list_name: name }, list_data).then(suc => {
            res.json({
                suc
            })
        }).catch(err => {
            res.json({
                err
            })
        })
    } else {
        res.json({
            msg: '非管理员'
        })
    }
})

module.exports = router;    