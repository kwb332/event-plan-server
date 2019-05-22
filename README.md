"# event-plan-server" 

Below is the assignment:

● OVERVIEW 
The objective of the test is to see how the candidate performs with frontend and backend technologies. We will be looking at: 
• The design of how the two parts (frontend and backend) work together 
• Cleanliness of the code 
• Requirements completed

● GOAL 
Create an event management app

● TASK REQUIREMENTS 
The user should have a form to create an event with the following data: 
• Event title 
• Event details 
• Event location (using Google Maps/places API is a plus) 
• Event date range 
-> If an event that is submitted overlaps with another event (i.e. same date and same place), the app should be able to detect and give a notification to the user that an event has already been booked 
• The user should be able to see all events created in a calendar view. 
• Clicking on the location would show a pop up of the event details 
• BONUS: Using Google Maps/Places API is a plus. Being able to see a map view of the event locations of the current day is a double plus.

● TECH REQUIREMENTS 
• You can use any Node.js framework (e.g. Express / Koa) 
• You can use any frontend framework (e.g. React Native / AngularJS)

● TASK SUBMISSION 
Once you’ve completed the test please email a link to a Github/Bitbucket repo.

If possible please also host the page somewhere and supply the link so that we can test it easily.
******************What I have done ******************
The main application is in event.routes.js.  The application uses the following technologies graphQL, node.js as the server, mongo DB, mongose (to querry mongoDB).  Please use code in production branch as master is not updated 

The code presented is the backend code for the application.

Here are the calls I have writen so far and they can be found in event.routes.js. 

1. To fetch all existing events
     var getEvents = function() {
       Event.find(function(err,events)
       {
         
        return events;
       });
      
    }

 2. Fetch a specific event by ID
 I use this call to fetch the data from mongo:  Event.findById(id, function(err,events)
 {  
     
     return events;
 }

 3.  Add a new Event

addEvent - Adds new event and returns true if successful.  Returns false if it is not successful because of event conflict.  
Steps to run and test the server:

1. get application from git using: git clone "https://github.com/kwb332/event-plan-server.git"

2. get onto the new directory created by git and type npm install

3. type nodemon index.js to run the server

4. Open your browser and browse to http://localhost:4000/graphql to test.

Here are the api calls for each of the methods described above

-To test getting all events type the following into the browser and hit enter:

query
{
  events
  {
    id
    description
    type
    poster
    startDate
    endDate
    latitude
    location
    longitude
    
  }
}

-To test getting a specific event..eg id of 1

query
{
  event(id :1)
  {
    id
    description
    type
    poster
    startDate
    endDate
    latitude
    location
    longitude
    
  }
}

-to test adding a new event....
mutation {
  addEvent(newEvent: {description: "Kintis Gets Married", type: "Wedding", poster: "Samuel Kintiz", startDate: "02/02/2019", endDate: "02/02/2019", latitude: 2345.44, location: "Mars", longitude: 2345.44})
}


