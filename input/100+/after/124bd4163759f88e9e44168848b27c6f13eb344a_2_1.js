function( e ) {
				var target = e.currentTarget;
				if ( target.width < target.height ) {
					layout = 'portrait';
				}

				var vertical_spacing = screenHeight - target.height;


				vertical_spacing = (vertical_spacing >= 0) ? ((vertical_spacing/4)) : 0;
					
				//need to set the css width so it does not stretch
				if ( target.width < screenWidth ) {
					$(img).css({width: target.width + 'px'});
				}

				if (target.height > target.width && target.height > screenHeight) {
					$(img).css({width:'auto', height: (screenHeight-100)+'px'});
					//calc the spacing
					var r = target.width/ target.height,
						s = (r * (screenHeight) ) / 2;

					$(img).css({'left':s + 'px'});

				}

				$(img).css({'margin-top': vertical_spacing +'px'} );

				cb.call( img, target.width, target.height, vertical_spacing );
			}