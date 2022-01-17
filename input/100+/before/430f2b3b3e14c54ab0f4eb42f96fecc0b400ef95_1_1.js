function() {
				var width = Math.floor((100 / columns) * $(this).data('colspan'));
				i++;
				
				if(i == $('section.group').length) {
					$(this).width(left + '%');
				} else {
					$(this).width(width + '%');
					left -= width;
				}
			}