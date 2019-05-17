var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var Event = require('./event.model');
module.exports = function(app)
{
    
    var eventData = [
        {
            id: 1,
            title: 'The Complete Node.js Developer Course',
            poster: 'Samuel Kintiz',
            type: 'Wedding',
            description: 'Kintis Gets Married',
            street: 'Mars',
            state: 'CA',
            primaryColor: 'red',
            secondaryColor:'blue',
            startDate: '02/02/2019',
            endDate: '02/02/2019'
        },
        {
            id: 2,
            title: 'The Complete Node.js Developer Course',
            poster: 'Samuel Kintiz',
            type: 'Wedding',
            description: 'Kintis Gets Married',
            street: 'Mars',
            state: 'CA',
            primaryColor: 'red',
            secondaryColor:'blue',
            startDate: '02/02/2019',
            endDate: '02/02/2019'
        },
        {
            id: 3,
            title: 'The Complete Node.js Developer Course',
            poster: 'Samuel Kintiz',
            type: 'Wedding',
            description: 'Kintis Gets Married',
            street: 'Mars',
            state: 'CA',
            primaryColor: 'red',
            secondaryColor:'blue',
            startDate: '02/02/2019',
            endDate: '02/02/2019'
        }
    ]

// GraphQL schema
var schema = buildSchema(`
type Query {
    event(id: Int!): Event
    events : [Event]
},

input EventInput {
    title: String
    poster: String
    type: String
    description: String
    street: String
    state: String
    primaryColor: String,
    secondaryColor: String,
    startDate: String
    endDate: String
},
type Event {
    id: Int
    title: String
    poster: String
    type: String
    description: String
    street: String
    state: String
    primaryColor: String,
    secondaryColor: String,
    startDate: String
    endDate: String
},
type Mutation {
    updateEvent(EventInput: Int!): Event
    addEvent(newEvent : EventInput!): Boolean
}
`);


/*
 Fetch a specific event by ID
 getEvent - the call is done but you will need to replace the array with actual data from mongo db.  I have already written the call to fetch the data from mongo DB but there is no database so you have to install and deploy a mongo db and populate it with the actual data as seen in the array. I use this call to fetch the data from mongo:  Event.findById(id, function(err,events)
 {  
     // when you are done and there is a real database events will be populated and return as json to the client application
     return events;
 } */

    var getEvent = function(args) { 
        var id = args.id;

        Event.findById(id, function(err,events)
        {
             
        });
        return eventData.filter(curEvent => {
            return curEvent.id == id;
        })[0];
    }
   /*To fetch all existing events
 getEvents - the call is done but you will need to replace the array with actual data from mongo db.  I have already written the call to fetch the data from mongo DB but there is no database so you have to install and deploy a mongo db and populate it with the actual data as seen in the array. I use this call to fetch the data from mongo:    var getEvents = function() {
       Event.find(function(err,events)
       {
           // when you are done and there is a real database events will be populated and return as json to the client application
        return events;
       });
      
    } */ 
    var getEvents = function() {
       Event.find(function(err,events)
       {
           if(err)
           {
               console.log(err);
           }
           else
           {
         //  eventData = events;
           console.log(events);
            
           }
          
       });

       return eventData;
    }
    
    var updateEvent = function(args)
    {
        eventData.map(curEvent => {
            if (curEvent.id === args.id) {
                curEvent.description = args.description;
                return curEvent;
            }
        });
        return eventData.filter(curEvent => curEvent.id === args.id) [0];
    }

    /*  Add a new Event
addEvent - Adds new event and returns true if successful.  Returns false if it is not successful because of event conflict.  The filter is not working so see if you can fix it. */
    var addEvent = function(args) {
       var newEvent  = new Event(args.newEvent);
       newEvent.save(function(err)
       {
           if(err)
           {
              console.log(err);
           }
       });
       var startDate = new Date(args.newEvent.startDate);
       var endDate = new Date(args.newEvent.EndDate);
       var conflicts =  eventData.filter(curEvent => new Date(curEvent.startDate) <= startDate && new Date(curEvent.EndDate) > endDate);
       if(conflicts.length > 0)
           return false;
       else
           eventData.push(args.newEvent);
           return true;
    }
// Root resolver
    var root = {
        event: getEvent,
        events: getEvents,
        updateEvent: updateEvent,
        addEvent : addEvent
      };
  
    app.use('/graphql', express_graphql({
        schema: schema,
        rootValue: root,
        graphiql: true
    }));
}