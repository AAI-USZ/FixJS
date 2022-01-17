function (jqXHR, textStatus, errorThrown) {
            console.log("Google Calendar API error: "+textStatus);
            calendarData =  ERROR_FLAG;
            //alert('Sorry, there was a problem retrieving Google Calendar events.  '+TRY_AGAIN_MSG);
        }