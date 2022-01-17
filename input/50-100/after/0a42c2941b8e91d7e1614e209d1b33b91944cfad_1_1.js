function() {
		// this because there is no space for the pencil in the and the delete icon because the labels all have widths assigned 
		wrong_width = parseInt($(this).css('width'), 10);
		right_width = wrong_width +100; 
		$(this).css('width', right_width+'px');
		$(this).append('<span class="info"></span><img src="/images/pencil.png" alt="pencil" class="pencil" />');
		recalculateEventDate($(this).prev('.timeline-event-tape').attr('id') );
	}