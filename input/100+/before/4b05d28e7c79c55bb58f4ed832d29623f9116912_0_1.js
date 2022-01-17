function (req, res, next){
    var current = new Date();
    current.setUTCHours(current.getUTCHours() + config.schedule.timezone_offset);
    if (req.params.datetime) {
	current = parseDate(req.params.datetime);
	// if the datetime param is not a valid date, pursue
	if (isNaN(current.getTime())) {
	    next();
	}
    }
    Event.find({})
		.populate('room', ['shortname','name'])
	    .sort('timeStart', 1)
	    .populate('proposedBy')
		.exec( 
	function(err, events) {
	    var days = [];
	    var timeslots = [];
	    var schedule = {};
	    var currentEvents = [];
	    var nextEvents = [];
	    var myEvents = [];
	    var currentTimeEnd;
	    events.sort(function (a,b) { return (a.timeStart > b.timeStart ? 1 : (b.timeStart > a.timeStart ? -1  : (a.room && b.room ? (a.room.name > b.room.name ? 1 : (b.room.name > a.room.name ? -1 : 0)) : 0)));});	    
	    for (var i in events) {
		events[i].timeStart.setUTCHours(events[i].timeStart.getUTCHours() + parseInt(config.schedule.timezone_offset, 10));
		events[i].timeEnd.setUTCHours(events[i].timeEnd.getUTCHours() +  parseInt(config.schedule.timezone_offset, 10));
		var day = events[i].timeStart.toDateString();
		var timeslot = {timeStart: events[i].timeStart , timeEnd: events[i].timeEnd}; 
		if (events[i].timeStart <= current && events[i].timeEnd >= current) {
		    currentTimeEnd = events[i].timeEnd;
		    currentEvents.push(events[i]);
		}
		if (currentTimeEnd && events[i].timeStart.toString() == currentTimeEnd.toString()) {
		    nextEvents.push(events[i]);
		}
		var isInterested = new RegExp("^"  + events[i].interested.join("|") + "$");
		if (req.user && isInterested.test(req.user._id)) {
		    myEvents.push(events[i]);
		}
		if (!schedule[day]) {
		    days.push(day);
		    schedule[day] = {};
		    timeslots[day] = [];
		}
		if (!schedule[day][JSON.stringify(timeslot)]) {
		    schedule[day][JSON.stringify(timeslot)] = [];
		    timeslots[day].push(timeslot);
		}
		schedule[day][JSON.stringify(timeslot)].push(events[i]);
	    }
	    res.render('schedule.ejs', {locals: {days: days, timeslots: timeslots, schedule:schedule, currentEvents: currentEvents, nextEvents: nextEvents, myEvents: myEvents, places: places, title: "Schedule", script:"/js/event-interest.js"}});
	});
}