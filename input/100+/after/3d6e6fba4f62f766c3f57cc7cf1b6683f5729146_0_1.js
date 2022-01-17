function( e ) {
				var target = e.currentTarget;
				if ( target.width < target.height ) {
					layout = 'portrait';
				}

				var spacing = screenHeight - target.height;

				spacing = (spacing >= 0) ? ((spacing/4)) : 0;
				//need to set the css width so it does not stretch
				if ( target.width < screenWidth ) {
					$(img).css({width: target.width + 'px'});
					//also, need to center the image
					var horizontal_spacing = (screenWidth - target.width) / 2;
					$(img).css({'margin-left': horizontal_spacing + 'px'});
				} else {
					spacing += 35;
				}
				
				$(img).css({'margin-top': spacing +'px'} );

				cb.call( img, target.width, target.height, spacing );
			}