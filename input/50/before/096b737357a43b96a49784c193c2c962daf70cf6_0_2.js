function(){
		console.log('click');
		flash.css('display', 'block').html('<div class="alert alert-notice">sorry, this tool isn\'t ready</div>').delay(2000).fadeOut(500);
	}