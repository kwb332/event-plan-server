var express = require('express')
,cors = require('cors')
  , app = express();

  var originsWhitelist = [
    'http://localhost:4200/locations',      //this is my front-end url for development
     'http://www.myproductionurl.com'
  ];
  var corsOptions = {
    origin: function(origin, callback){
          var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
    credentials:true
  }

  app.use(cors(corsOptions));
//Setup Database
var mongose = require('mongoose');
try
{
mongose.connect("mongodb+srv://admin:admin@cluster0-rknoo.mongodb.net/Event?retryWrites=true",{ useNewUrlParser: true });

}
catch(err)
{
   console.log(err);
}
// Create an express server and a GraphQL endpoint
var app = express();
var event = require('./event.routes.js')(app);
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));