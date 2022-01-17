function(request, response){
    
        console.log('Received new event submission')
        console.log(request.body);
        
        //Prepare date data
        var thisStartTime = moment.utc(request.body.eventStartTime, "h:mm a");
        var thisEndTime = moment.utc(request.body.eventEndTime, "h:mm a");
        var thisDay = moment(request.body.eventDate, "M/D/YYYY");
        
        var startTimeStamp = moment(thisDay);
        startTimeStamp.hours(thisStartTime.hours()).minutes(thisStartTime.minutes()).seconds(thisStartTime.seconds());
        
        //if the end time is the next day, meaning less than the start time
//        if (thisEndTime < thisStartTime){
	//        var endTimeStamp = moment(thisDay).add('days',1);
//        }
//        else{
	        var endTimeStamp = moment(thisDay);
//	    }
        endTimeStamp.hours(thisEndTime.hours()).minutes(thisEndTime.minutes()).seconds(thisEndTime.seconds());
        
        
        //FIX!!! ugh
        //startTimeStamp.subtract('hours', 4);
        //endTimeStamp.subtract('hours', 4);
    
        // Prepare the event entry form into a data object
        var eventData = {
            name : request.body.eventName,
            urlslug : request.body.urlslug,
            date : request.body.eventDate,
            place: request.body.eventPlace,
            desc : request.body.eventDesc,
            author : {
                name: request.body.eventAuthorName,
                email: request.body.eventAuthorEmail
            },
            location: {
                latitude: request.body.eventPlaceLat,
                longitude: request.body.eventPlaceLng,
                placename: request.body.eventPlace,
                address: request.body.eventAddress
            },
            datetime: {
                timestamp: new Date(thisDay),
                date: new Date(thisDay),
                starttimestamp: new Date(startTimeStamp),
                endtimestamp: new Date(endTimeStamp)
            },
            lastEdited : new Date(),
            link : request.body.eventLink
        };

        // create a new blog post
        var thisEvent = new db.Event(eventData);
        console.log("event times: "+startTimeStamp+" = "+startTimeStamp.calendar()+" utc "+startTimeStamp.utc().calendar());
        
        // save the blog post
        thisEvent.save();
    
        // redirect to show the single post
        response.redirect('/events/' + eventData.urlslug); // for example /entry/this-is-a-post
    
    }