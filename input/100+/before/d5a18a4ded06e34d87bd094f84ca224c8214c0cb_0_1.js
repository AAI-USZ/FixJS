function( e ) {
				var target = e.currentTarget;
				if ( target.width < target.height ) {
					layout = 'portrait';
				}

				var spacing = screenHeight - target.height;

				//spacing must be greater than/equal 0 or set it to zero
				spacing = (spacing >= 0) ? ((spacing/4) + 30) : 0;
				$(img).css({'margin-top': spacing +'px'} );

				cb.call( img, target.width, target.height, spacing );
			}