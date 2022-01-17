function() {
	var target = $(this).data('navbar');
	var left = $(target).offset()['left'];
    	navbar_img.animate({
	    left: left
     	}, {
	    duration: 'slow',
	    easing: 'easeOutBack'
	});
    }