function displayParty(data){
    $('#party-header h1').html(data.name);
    $('#posterImg').attr('src', data.poster_url);
    $('#party-venue').html(data.venue.name);
    var start = new Date(data.time.start);
    var end = new Date(data.time.end);
    var day = '';
    var sStart = '';
    var sEnd = '';
    var now = new Date();
    if(end<now){ //TODO: usa switch o qualcosa
        console.log('party over');
        sEnd=$.timeago(end);
    } else {
     if(isGoingOn(start, end)) {
        day = 'Now';
    } 
    else if (isToday(start)) {
        day = 'Today';
        sStart=' from ' + trailingZero(start.getHours()) + ":"+trailingZero(start.getMinutes());
    }
    
    else if (isTomorrow(start)) {
        day = 'Tomorrow';
        sStart=' from ' + trailingZero(start.getHours()) + ":"+trailingZero(start.getMinutes());

    } else { 
        day = "Next " + dayName(start.getDay());
        sStart=' from ' + trailingZero(start.getHours()) + ":"+trailingZero(start.getMinutes());

    }
    if (isToday(end)) {
        sEnd = ' until ' + trailingZero(end.getHours()) + ":" + trailingZero(end.getMinutes());
    }
    
    else if (isTomorrow(end)) {
       sEnd = ' until tomorrow at ' + trailingZero(end.getHours()) + ":" + trailingZero(end.getMinutes());

    } else {
        endDay = "next " + dayName(end.getDay());
        sEnd = ' until ' +endDay + " at "+ trailingZero(end.getHours()) + ":" + trailingZero(end.getMinutes());

    }
}
    $('#party-time').html("<span id='day'>"+day+"</span>"+sStart+sEnd);
    $('#party-desc').html(data.description);
    venueObj = {}; //TODO: refactor
    venueObj.lat = data.venue.lat;
    venueObj.lon = data.venue.lon;
    venueObj.name = data.venue.name;
    venueObj.id = data.venue._id;

    eventObj={};
    eventObj.name = data.name;
    enableCheckinBtn();
    $("input[type='checkbox']").checkboxradio('disable');
}