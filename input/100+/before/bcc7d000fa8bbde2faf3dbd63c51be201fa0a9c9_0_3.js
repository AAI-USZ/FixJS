function getGoogleCalAsync() {

    var now = (new Date()).toISOString();

    return $.ajax({
        url: 'https://www.googleapis.com/calendar/v3/calendars/96msjdsgp3tcs3jv8kegvd9rhc@group.calendar.google.com/events',

        data: {
            fields: "items(description, end, location, start, summary)",
            singleEvents: true,
            timeMin: now,
            key: "AIzaSyAZEASvv4Go1qssuljASB76T1HQPg_GgW8",
            orderBy: "startTime"
        },

        type: 'GET',
        timeout: 2000,
        dataType: 'jsonp',
        success: function(json) {
            console.log("done getting Google Calendar data");
            calendarData = json;
            generateEventFormattedDates(json.items);
            //console.log(JSON.stringify(json, null, '  '));
        },

        error:function (jqXHR, textStatus, errorThrown) {
            console.log("Google Calendar API error: "+textStatus);
            calendarData =  ERROR_FLAG;
            alert('Sorry, there was a problem retrieving Google Calendar events.  '+TRY_AGAIN_MSG);
        }
    });
}