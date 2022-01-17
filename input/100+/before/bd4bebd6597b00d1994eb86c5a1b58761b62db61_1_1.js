function(e){
		e.preventDefault();

		var cur = $(this).parent(),
			tabName = $(this).parent().attr('data-tab');

		element.find(">[data-tab]").removeClass('active');
		cur.addClass('active');

		control.find(">[data-tab]").hide().removeClass('active');
		control.find(">[data-tab=" + tabName + "]").addClass('active').stop(true, true).fadeIn(500);
	}