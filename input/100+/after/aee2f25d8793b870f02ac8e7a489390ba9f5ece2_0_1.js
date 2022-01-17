function generateEventFormattedDates(events) {
    var startDT, endDT,  startDate, startTime, endTime;
    for (var i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.start.date) {
            // Safari and js-iso8601 require the full date
            // add 1:01 to account for daylight savings time
            startDT = getFormattedDate(new Date(Date.parse(event.start.date +"T00:00:00-05:01")));
            // subtract 1:01 to account for daylight savings time and to prevent spillover into midnight of next day for all-day events
            endDT =  getFormattedDate(new Date(Date.parse(event.end.date +"T00:00:00-02:59")));
            if (startDT === endDT) {
                event.formattedDate = startDT;
            } else {
                event.formattedDate = startDT + ' - ' + endDT;
            }
        } else if (event.start.dateTime) {
            startDT = new Date(Date.parse(event.start.dateTime));
            endDT = new Date(Date.parse(event.end.dateTime));

            startDate = getFormattedDate(startDT);
            startTime = getFormattedTime(startDT);
            endTime = getFormattedTime(endDT);

            event.formattedDate = startDate + ", " + startTime + " - " + endTime;

        }
    }
}