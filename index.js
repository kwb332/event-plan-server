var express = require('express')
,cors = require('cors')
  , app = express();

//Setup Database
var mongose = require('mongoose');
try
{
mongose.connect("mongodb+srv://admin:admin@cluster0-rknoo.mongodb.net/events?retryWrites=true",{ useNewUrlParser: true });
//mongose.connect("mongodb://localhost:27017/events",{ useNewUrlParser: true });

}
catch(err)
{
   console.log(err);
}
// Create an express server and a GraphQL endpoint
var app = express();
var event = require('./event.routes.js')(app);
app.listen(8081, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));