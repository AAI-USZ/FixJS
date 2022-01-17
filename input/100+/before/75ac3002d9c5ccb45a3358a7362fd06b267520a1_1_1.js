function() {

	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
	
	$('#calendar').fullCalendar({
		editable: true,        
		header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    defaultView: 'month',
    height: 400,
    slotMinutes: 15,    
    selectable: true,
		selectHelper: true,
    editable: true,
		
    select: function(start, end, allDay) { 
      var title = prompt('Exchange Event ID:');
			if (title) {
  			$('#calendar').fullCalendar('renderEvent', {
  					title: title,
  					start: start,
  					end: end,
  					allDay: allDay
  				},
  				true // make the event "stick"
  			);
        createEvent({
  					title: title,
  					start: start,
  					end: end,
  					allDay: allDay
  				});
  		}
  		$('#calendar').fullCalendar('unselect');
    },
  	
        
    loading: function(bool){
      if (bool) 
        $('#loading').show();
      else 
        $('#loading').hide();
    },
        
    // a future calendar might have many sources.        
    eventSources: [{
      url: '/reservations',
      color: '#2F4D6A',
      textColor: 'white',
      error: function() {
                alert('there was an error while fetching events!');
            },
      ignoreTimezone: false
    }],
        
    timeFormat: 'h:mm t{ - h:mm t} ',
    dragOpacity: "0.5",
        
    //http://arshaw.com/fullcalendar/docs/event_ui/eventDrop/
    eventDrop: function(event, dayDelta, minuteDelta, allDay, revertFunc){
        updateEvent(event);
    },

    // http://arshaw.com/fullcalendar/docs/event_ui/eventResize/
    eventResize: function(event, dayDelta, minuteDelta, revertFunc){
        updateEvent(event);
    },

    // http://arshaw.com/fullcalendar/docs/mouse/eventClick/
    eventClick: function(event, jsEvent, view){
      // would like a lightbox here.
    },
	});
}