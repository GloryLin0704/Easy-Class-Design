const express = require('express');
const router = express.Router();
const auth = require('../tools/auth');
const { listModel } = require('../tools/db')


router.get('/', (req, res) => {

    let name = req.query.name;

    if (name) {
        listModel.find({ list_name: name }).then(result => {
            res.json({
                result
            })
        }).catch(err => {
            res.json({
                err
            })
        })
    } else {
        listModel.find().then(result => {
            res.json({
                result
            })
        }).catch(err => {
            res.json({
                err
            })
        })
    }
})

module.exports = router;