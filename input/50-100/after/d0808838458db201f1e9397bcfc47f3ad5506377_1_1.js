function (index) {
			var items = slider.find('.placeholder');
			// This will trigger a smooth css transition
			slider.css('left',(-index*100)+'%');
			overlay.toggleClass('is-gallery-last', index+1 >= items.length);
			overlay.toggleClass('is-gallery-first', index <= 0);
			
		}