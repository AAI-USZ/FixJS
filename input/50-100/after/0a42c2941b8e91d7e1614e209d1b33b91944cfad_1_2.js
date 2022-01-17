function() {
		wrong_width = parseInt($(this).css('width'), 10);
      right_width = wrong_width +100;
      $(this).css('width', right_width+'px');
		$(this).append('<span class="info"></span>');
	    recalculateEventDate( $(this).prev('.timeline-event-tape').attr('id'));
	}