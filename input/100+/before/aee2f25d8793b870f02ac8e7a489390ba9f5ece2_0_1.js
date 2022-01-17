function generateEventFormattedDates(events) {
    for (var i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.start.date) {
            // Safari and js-iso8601 require the full date
            event.formattedDate = getFormattedDate(new Date(Date.parse(event.start.date +"T00:00:00-04:00")));
        } else if (event.start.dateTime) {
            var startDT = new Date(Date.parse(event.start.dateTime));
            var endDT = new Date(Date.parse(event.end.dateTime));

            var startDate = getFormattedDate(startDT);
            var startTime = getFormattedTime(startDT);
            var endTime = getFormattedTime(endDT);

            event.formattedDate = startDate + ", " + startTime + " - " + endTime;

        }
    }
}