var mongose = require('mongoose');




var eventSchema = mongose.Schema({
    id: Number,
    title: String,
    poster: String,
    type: String,
    description: String,
    street: String,
    state: String,
    primaryColor: String,
    secondaryColor: String,
    startDate: Date,
    endDate: Date,
});


module.exports = mongose.model('Event', eventSchema);

