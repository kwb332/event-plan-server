var express = require('express')
,cors = require('cors')
  , app = express();

//Setup Database
var mongose = require('mongoose');
try
{
mongose.connect("mongodb+srv://admin:admin@cluster0-rknoo.mongodb.net/events?retryWrites=true",{ useNewUrlParser: true });


}
catch(err)
{
   console.log(err);
}
// Create an express server and a GraphQL endpoint
var app = express();
var event = require('./routes/router.js')(app);
app.listen(process.env.PORT || 5000, () => console.log('Express GraphQL Server Now Running On heroku (https://raggioeventplan.herokuapp.com/graphql)' ));
