var express = require('express');
//Setup Database
var mongose = require('mongoose');
mongose.connect('mongodb://localhost/events')
// Create an express server and a GraphQL endpoint
var app = express();
var event = require('./event.routes.js')(app);
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));