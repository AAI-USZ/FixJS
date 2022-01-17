function (e) {
			if (hideDelayTimer) clearTimeout(hideDelayTimer);
			if (beingShown || shown) {
				// don't trigger the animation again
				return;
			} else {
				// reset position of info box
				beingShown = true;
				
				var target_offset = $(this).offset();
				
				info.css({
					top: (target_offset.top - 20) + "px",
					left: target_offset.left + "px",
					display: 'block',
					background: 'white'
				}).animate({
					top: '-=' + distance + 'px',
					opacity: 1
				}, time, 'swing', function() {
					beingShown = false;
					shown = true;
				});
			}

			return false;
		}