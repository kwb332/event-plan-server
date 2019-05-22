var { buildSchema } = require('graphql');

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
module.exports = schema;

