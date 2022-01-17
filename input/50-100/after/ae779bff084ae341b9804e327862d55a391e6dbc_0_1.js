function() {
		
		var slide = $("<div/>", {
			'class': 'item item6'
		}).append($('<img />', {
			'src': '../../_site-demo/_img/h-slider-1.jpg'
		}));
		
		$('.add-remove-slide-slider').iosSlider('addSlide', slide, 1);
	
	}