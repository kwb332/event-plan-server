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

    var getEvent = async function(args,res) { 
        var id = args.id;
        let foundEvent = null;
        await Event.findById(id, function(err,event)
        {
           if(err)  
           {
               console.log(err);
           }
            if(event)
            {
                foundEvent = event;
            }
        }
        );
           return foundEvent;
    }
   /*To fetch all existing events
 */ 
    var getEvents = async function() {
       return await Event.find(function(err,events)
       {
           if(err)
           {
               console.log(err);
           }
           if(events)
           {
           
            
           }
          
       });
        
    }
    
    var updateEvent = async function(args)
    {
        var id = args.updateEvent._id;
        var results = null;
        await Event.findById(id,  function(err, foundEvent)
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
                   results = foundEvent;
                })
              
            }
        });

        return results;
       
    }

    var deleteEvent =  function(args)
    {
        var id = args._id;
       
       return Event.findByIdAndRemove(id, result = function(err)
        {
            
            if(err)
            {
                console.log("There is an error");
                console.log(err);
              
            } 
            else
            {
             
            }
        });

       
       
    }

    /*  Add a new Event
addEvent - Adds new event and returns true if successful.  Returns false if it is not successful because of event conflict. */
    var addEvent = async function(args) {
       var newEvent  = new Event(args.newEvent);
       var isAdded = false;
       var startDate = args.newEvent.startDate;
       var endDate = args.newEvent.endDate;
       
     
       await newEvent.save(function(err)
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

  //  var eventData = getEvents();
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