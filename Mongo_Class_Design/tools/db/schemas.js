const mongoose = require('./connect');

let schemas = {};

//用户
schemas.user = mongoose.Schema({
    user_name: {
        type: String,
        requrie: true
    },
    user_password: {
        type: String,
        require: true
    }
})

//联系人信息
schemas.list = mongoose.Schema({
    list_name: {
        type: String,
        requried: true
    },
    list_sex: {
        type: String,
        requried: true
    },
    lise_mobile_number: {
        type: String,
        requried: true
    },
    list_birthday: {
        type: String,
        requried: true
    },
    list_address: {
        type: String,
        requried: true
    },
    list_family_phone: {
        type: String,
        requried: true
    },
    list_family_address: {
        type: String,
        requried: true
    },
});

//联系人
schemas.contacts = mongoose.Schema({
    contact: {
        type: String,
        require: true
    }
})

module.exports = schemas;

