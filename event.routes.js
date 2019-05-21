var _= require("lodash");
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var Event = require('./event.model');
module.exports = function(app)
{
   

// GraphQL schema
var schema = buildSchema(`
type Query {
    event(id: String!): Event
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
input EventUpdateInput {
    _id: String
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
    _id: String
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
    updateEvent(updateEvent: EventUpdateInput!): Event
    addEvent(newEvent : EventInput!): Boolean
    deleteEvent(_id : String!) : Boolean
}
`);


/*
 Fetch a specific event by ID

  */

    var getEvent = function(args,res) { 
        var id = args.id;
        let foundEvent = null;
        Event.findById(id, function(err,event)
        {
           if(err)  
           {
               console.log(err);
           }
            if(event)
            {
                return event;
            }
        }
        );
        
    }
   /*To fetch all existing events
 */ 
    var getEvents = function() {

       Event.find(function(err,events)
       {
           if(err)
           {
               console.log(err);
           }
           if(events)
           {
            eventData = events;
            
           }
          
       });

       return eventData;
    }
    
    var updateEvent = function(args)
    {
        var id = args.updateEvent._id;
      
        Event.findById(id, function(err, foundEvent)
        {
            if(err)
            {
                console.log("There is an error");
                console.log(err);
            } 
            if(foundEvent)
            {
               
                console.log(foundEvent);
            
             
                _.merge(foundEvent, args.updateEvent);
                foundEvent.save(function(err)
                {
                   if(err)
                   {
                       console.log(err)
                   }
                })
               return foundEvent;
            }
        });
       
    }

    var deleteEvent = function(args)
    {
        var id = args._id;
        var result = false;
        Event.findByIdAndRemove(id, result = function(err)
        {
            
            if(err)
            {
                console.log("There is an error");
                console.log(err);
                return result;
            } 
            else
            {
              result = true;
              return result;
            }
        });
       
    }

    /*  Add a new Event
addEvent - Adds new event and returns true if successful.  Returns false if it is not successful because of event conflict. */
    var addEvent = function(args) {
       var newEvent  = new Event(args.newEvent);
       var isAdded = false;
       eventData = getEvents();
       var startDate = args.newEvent.startDate;
       var endDate = args.newEvent.endDate;
       
     
        newEvent.save(function(err)
        {
            if(err)
            {
               console.log(err);
               isAdded = false;
            }
            else
            {
                 isAdded = true;
            }
        });
       
  
       return isAdded;
    }

    var eventData = getEvents();
// Root resolver
    var root = {
        event: getEvent,
        events: getEvents,
        updateEvent: updateEvent,
        deleteEvent: deleteEvent,
        addEvent : addEvent
      };
  
    app.use('/graphql', express_graphql({
        schema: schema,
        rootValue: root,
        graphiql: true
    }));
}