function () {						// Home link
		$('.page').hide();
		var courseid = $(this).attr('courseid');
		dscourse.getCourse(courseid);
		$('#coursePage').show();
		$('html, body').animate({scrollTop:0});			// The page scrolls to the top to see the notification

	}