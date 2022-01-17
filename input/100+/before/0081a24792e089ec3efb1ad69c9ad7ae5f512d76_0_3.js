function($){
		// be nice to IE
		//json_get = (jQuery.browser.msie && window.XDomainRequest) ? msxdr : jQuery.getJSON;
		json_get = jQuery.getJSON;
		jQuery.ajaxSetup({
			jsonpCallback: 'callme',
			cache: true,
			timeout: 5000
		});
		// init 
		container = $('#nodes');
		// Masonry options
		container.masonry({
			itemSelector: '.gig-outerbox',
			isAnimated: true,
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			}
		});
		// get data now
		fetch(true);
		// get data every {delay} millisecond
		window.setInterval(function(){ fetch(true); }, delay);
		// load more
		$(document).on('click', '.gig-morebtn', function(){
			Gignal_more();
		});
		// modal click event
		$(document).on('click', '.modal', function (e) {
			e.preventDefault();
			$(new Image()).attr('src', $(this).attr('href')).modal({
				autoResize: true,
				position: ['3%'],
				minWidth: 400,
				maxWidth: 415,
				maxHeight: 500,
				overlayClose: true
			});
		});
	}