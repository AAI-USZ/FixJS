function() {
			var winTop = $(window).scrollTop();
			var navEl = methods.navEl;
			var cssPos = navEl.css("position");

			if (winTop > methods.navTop) { 
				navEl.prev().show();
				
				navEl.css({
					"position": "fixed",
					"top": 0
					/* "left": 0 */
				});
				
			} else {
				navEl.prev().hide();
				
				navEl.css({
					"position": "relative"
				}); 
			}
			
			if (cssPos != methods.prevCssPos) {
				navEl.trigger(cssPos);
				methods.prevCssPos = cssPos;
			}
		}