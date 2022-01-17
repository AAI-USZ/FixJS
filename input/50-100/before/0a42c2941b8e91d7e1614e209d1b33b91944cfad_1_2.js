function() {
		wrong_width = parseInt($(this).css('width'));
	   	rigth_width = wrong_width +100;
	   	$(this).css('width', rigth_width+'px');
		$(this).append('<span class="info"></span>');
	    recalculateEventDate( $(this).prev('.timeline-event-tape').attr('id'));
	}