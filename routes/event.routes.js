var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var controller = require('../controllers/events.Controller');
var modelschema = require('../middlewares/graphql/event.schema/event.schemaGQL');

var root = {
    event: controller.getEvent,
    events: controller,
    updateEvent: controller.updateEvent,
    deleteEvent: controller.deleteEvent,
    addEvent : controller.addEvent
  };

module.exports = root;