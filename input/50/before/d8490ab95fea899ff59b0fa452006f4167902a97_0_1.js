function(){
    	$('html, body').animate({
    		scrollTop:$('#account').offset().top
    	}, 1000, function() {
	    	manageScroll(); // Callback is required for iOS
		});
    	return false;
    }