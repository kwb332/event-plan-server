var _= require("lodash");
var express_graphql = require('express-graphql');
var modelschema = require('../middlewares/graphql/event.schema/event.schemaGQL');
var root = require('./event.routes');
module.exports = function(app)
{

 
    app.use('/graphql', express_graphql({
        schema: modelschema,
        rootValue: root,
        graphiql: true
    }));
}