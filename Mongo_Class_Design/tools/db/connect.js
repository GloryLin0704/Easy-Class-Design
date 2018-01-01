const monogoose = require('mongoose')
    , mongoUri = 'mongodb://127.0.0.1/ClassDesign';

monogoose.connect(mongoUri);

module.exports = monogoose;