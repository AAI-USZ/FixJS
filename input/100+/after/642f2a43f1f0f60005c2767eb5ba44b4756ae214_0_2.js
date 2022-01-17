function () {
				if( methods.settings.image ) {
					methods.container.css({
						'max-height' : $( window ).height() - 80,
						'max-width' : $( window ).width() - 80
					})
					
					methods.container.find('img.resp').css({
						'max-height': methods.container.height(),
						'max-width': methods.container.width()
					})
					
					
				} 
				var     left = $( window ).width()  - methods.container.width(),
					top  = $( window ).height() - methods.container.height()

					left = left / 2 + $( window ).scrollLeft()
					top  = top  / 2 + $( window ).scrollTop()
				
				methods.container.css({
					top: Math.max( top, 0 ),
					left: Math.max( left, 0)
				})


			}