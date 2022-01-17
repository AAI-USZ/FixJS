function() {
				var width = Math.floor((100 / columns) * $(this).data('colspan'));
				left -= width; i++;
				
				if(i == $('.group').length) {
					width += left;
					
					if (columns%2 && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
						width += (100 / $('body').width());
					}
				}
				
				$(this).width(width + '%');
				$(this).attr('data-width', width);
			}