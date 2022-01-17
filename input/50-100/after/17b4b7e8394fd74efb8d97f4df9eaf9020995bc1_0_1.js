function moveNavbar(target) {
	var left;
	$('#navbar-main-list > li.active').removeClass('active');

	if (target === null) {
	    left = '-200px';
	} else {
	    left = $(target).offset()['left'];
	    $(target).addClass('active');
	}

	navbar_img.animate({
	    left: left
     	}, {
	    duration: 'slow',
	    easing: 'easeOutBack'
	});
    }