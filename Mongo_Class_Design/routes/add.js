const express = require('express');
const router = express.Router();
const auth = require('../tools/auth');
const { contactsModel, listModel } = require('../tools/db')

router.post('/', (req, res) => {
    let token = req.headers.authorization;
    let auth_info = auth.check(token)

    if (auth_info.data === 'root') {
        let name = req.body.name;
        let sex = req.body.sex;
        let mobile = req.body.mobile;
        let birthday = req.body.birthday;
        let address = req.body.address;
        let family_phone = req.body.family_phone;
        let family_address = req.body.family_address;


        let contact_data = new contactsModel({
            contact: name
        });

        let list_data = new listModel({
            list_name: name,
            list_sex: sex,
            lise_mobile_number: mobile,
            list_birthday: birthday,
            list_address: address,
            list_family_phone: family_phone,
            list_family_address: family_address
        });


        contactsModel.find({ contact: name }).then(result => {
            if (result.length === 0) {
                return Promise.all([
                    contact_data.save(),
                    list_data.save()
                ]).then(suc => {
                    res.json({
                        msg: '新增完成'
                    })
                })
            }
            else {
                res.json({
                    msg: '该联系人与存在'
                })
            }
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
