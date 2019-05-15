var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

module.exports = function(app)
{
    
    var eventData = [
        {
            id: 1,
            title: 'The Complete Node.js Developer Course',
            poster: 'Samuel Kintiz',
            type: 'Wedding',
            description: 'Kintis Gets Married',
            location: 'Mars',
            longitude: 2345.44,
            latitude :  2345.44,
            startDate: '02/02/2019',
            endDate: '02/02/2019'
        },
        {
            id: 2,
            title: 'The Complete Node.js Developer Course',
            poster: 'Samuel Kintiz',
            type: 'Wedding',
            description: 'Kintis Gets Married',
            location: 'Mars',
            longitude: 2345.44,
            latitude :  2345.44,
            startDate: '02/02/2019',
            endDate: '02/02/2019'
        },
        {
            id: 3,
            title: 'The Complete Node.js Developer Course',
            poster: 'Samuel Kintiz',
            type: 'Wedding',
            description: 'Kintis Gets Married',
            location: 'Mars',
            longitude: 2345.44,
            latitude :  2345.44,
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
    location: String
    longitude: Float
    latitude : Float
    startDate: String
    endDate: String
},
type Event {
    id: Int
    title: String
    poster: String
    type: String
    description: String
    location: String
    longitude: Float
    latitude : Float
    startDate: String
    endDate: String
},
type Mutation {
    updateEvent(EventInput: Int!): Event
    addEvent(newEvent : EventInput!): Boolean
}
`);




    var getEvent = function(args) { 
        var id = args.id;
        return eventData.filter(curEvent => {
            return curEvent.id == id;
        })[0];
    }
    
    var getEvents = function() {
       
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
    var addEvent = function(args) {
       
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