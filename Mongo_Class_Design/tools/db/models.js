const schemas = require('./schemas')
    , monogoose = require('./connect');

let schemasNames = Object.keys(schemas);

let models = schemasNames.reduce((acc, cur) => {
    acc[cur + 'Model'] = monogoose.model(
        cur,
        schemas[cur]
    );
    return acc;
}, {});

module.exports = models;