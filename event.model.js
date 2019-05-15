var mongose = require('mongoose');

var eventSchema = mongose.Schema({
    id: Number,
    title: String,
    poster: String,
    type: String,
    description: String,
    location: String,
    longitude: Number,
    latitude : Number,
    startDate: Date,
    endDate: Date,
});
module.exports = mongose.model('Event', eventSchema);