function($){
		// get eventid
		var urlParams = getUrlParams();
		eventid = parseInt(urlParams.eventid, 10);
		if (!eventid) {
			document.title = 'Error: I need an eventid';
			return;
		}
		// tag msg
		tags = urlParams.tagstr;
		if (tags) {
			var t = tags.split(',');
			$('#tagmsg').append('#' + t.join(' #'));
		} else {
			$('#tagmsg').hide();
		}
		// limit?
		if (parseInt(urlParams.limit, 10) > 0) {
			limit = parseInt(urlParams.limit, 10);
		}
		// init 
		container_photos = $('#photos');
		container_text = $('#text');
		// Masonry options
		container_text.masonry({
			itemSelector: '.box',
			isAnimated: true,
			columnWidth: function (containerWidth) {
				return containerWidth;
			}
		});
		container_photos.masonry({
			itemSelector: '.box',
			isAnimated: true,
			columnWidth: function (containerWidth) {
				return containerWidth / 3;
			}
		});
		// set height
		$(document).resize(function(){
			var height = $(document).height() - ($('header').height() + $('footer').height());
			$('#nodes').height(height);
		});
		$(document).resize();
		// ajaxSetup
		jQuery.ajaxSetup({
			cache: false,
			timeout: 5000
		});
		// get data now
		fetch(eventid);
		// get data every {delay} millisecond
		window.setInterval(fetch, delay, eventid);
	}