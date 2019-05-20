var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var Event = require('./event.model');
module.exports = function(app)
{
   
   /* var eventData = [
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
    ] */

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
    id : Int
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
    id: Int
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
           res.json = {data: [res, event]};
           return res.json;
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
           else
           {
            eventData = events;
            
           }
          
       });

       return eventData;
    }
    
    var updateEvent = function(args)
    {
        var id = args.updateEvent.id;
        console.log(id);
        Event.findById(id, function(err,res)
        {
            if(err)
            {
                console.log("There is an error");
                console.log(err);
            } 
            if(res)
            {
                console.log("Panda Panda");
                console.log(res);
               var eventToUpdate = events.filter(curEvent => {
                    return curEvent.id == id;
                })[0]
                console.log(JSON.stringify(eventToUpdate));
                _merge(eventToUpdate, args.updateEvent);
                Event.save(eventToUpdate,function(err)
                {
                   if(err)
                   {
                       console.log()
                   }
                })
               return event;
            }
        });
       
        eventData.map(curEvent => {
            if (curEvent.id === args.id) {
                curEvent.description = args.description;
                return curEvent;
            }
        });
        return eventData.filter(curEvent => curEvent.id === args.id) [0];
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
       console.log("Adding");
       eventData = getEvents();
       var startDate = new Date(args.newEvent.startDate);
       var endDate = new Date(args.newEvent.endDate);
       var conflicts =  eventData.filter(curEvent => curEvent.startDate >= startDate && curEvent.endDate <= endDate);
       if(conflicts.length > 0)
       {
           isAdded = false;
       }
       else
       {
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
       }

      
  
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