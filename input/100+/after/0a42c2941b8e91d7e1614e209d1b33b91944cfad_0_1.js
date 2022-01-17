function eventSave(id) {
  var ttop, dbId,color;
  dbId = getDataBaseId(id);
  
  // get the band
  ttop  = parseInt($(id).css('top'), 10); 
  ttop  = Math.round((ttop)/30)+1; 
  if (ttop === 0) {ttop=1;}
  var title = $(id).next('.timeline-event-label').children('p').html();
  var info = id.next().children('.info');
  	
	if ($(id).hasClass('magenta')) { 
		color = 'magenta';
	}
	else if  ($(id).hasClass('cream')) { 
		color = 'cream';
	}
	else if  ($(id).hasClass('yellow')) { 
		color="yellow"; 
	}	
	else { 
		color = 'blue';
	}
	
	var start = info.children('.begin_date').attr('data-epoch');
	var end = info.children('.end_date').attr('data-epoch');
  if (end === undefined) {
		end = start; 
	}

  update_dates_for_event_on_the_server(dbId, start, end, ttop, title, color); 
}