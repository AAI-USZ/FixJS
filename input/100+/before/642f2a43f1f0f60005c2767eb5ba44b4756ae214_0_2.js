function () {
				if( methods.settings.image ) {
					methods.container.height( $( window ).height() - 80 )

					methods.container.find('img.resp').css({
						height: methods.container.height()
					})
				} 
				var     left = $( window ).width()  - methods.container.width(),
					top  = $( window ).height() - methods.container.height()

					left = left / 2 + $( window ).scrollLeft()
					top  = top  / 2 + $( window ).scrollTop()
				
				methods.container.css({
					top: Math.max( top, 0 ),
					left: Math.max( left, 0),
					width: methods.container.width(),
					height: methods.container.height()
				})


			}