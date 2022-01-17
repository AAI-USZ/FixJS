function() {
				hideDelayTimer = null;
				info.animate({
					top : '+=' + distance + 'px',
					opacity : 0
				}, time, 'swing', function() {
					shown = false;
				});
				info.empty()
				.removeAttr('style')
				.css('opacity',0)
				.css('display','none');

			}