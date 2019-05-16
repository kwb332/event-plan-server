var express = require('express');
//Setup Database
var mongose = require('mongoose');
try
{
mongose.connect("mongodb+srv://admin:admin@cluster0-rknoo.mongodb.net/data?retryWrites=true",{ useNewUrlParser: true });

}
catch(err)
{
   console.log(err);
}
// Create an express server and a GraphQL endpoint
var app = express();
var event = require('./event.routes.js')(app);
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));