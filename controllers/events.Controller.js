var _= require("lodash");
var Event = require('../models/event.model');
/*
 Fetch a specific event by ID

  */
 class Controller {
    // class methods
    constructor() {  }
    getEvents() { 
        var events = async function() {
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
         return events;
     }
     getEvent()
     {
        var _event = async function(args,res) { 
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
        return _event;
     }
     updateEvent()
     {
        var _updateEvent = async function(args)
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
        return _updateEvent;
     }
     deleteEvent()
     {
        var _deleteEvent = function(args)
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
        return _deleteEvent;
     }
     addEvent()
     {
        var _addEvent = async function(args) {
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
         return _addEvent;
     }
   
 }

 let controller = new Controller();
 









module.exports = controller;