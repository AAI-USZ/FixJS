function( e ) {
				var target = e.currentTarget;
				if ( target.width < target.height ) {
					layout = 'portrait';
				}

				var h = target.height;

				//need to set the css width so it does not stretch
				if ( target.width < screenWidth ) {
					$(img).css({width: target.width + 'px'});
				}

				if (target.height > target.width && target.height > screenHeight) {
					$(img).css({width:'auto', height: (screenHeight-100)+'px'});
					//calc the spacing
					var r = target.width/ target.height,
						s = (r * (screenHeight) ) / 2;
					//use margin-left as opposed to left because otherwise it does not slide	
					$(img).css({'margin-left':s + 'px'});
					//40 for the header
					h = r * h + 40;
				}
				
				var vertical_spacing = screenHeight -  h;

				vertical_spacing = (vertical_spacing >= 0) ? ((vertical_spacing/4)) : 0;

				$(img).css({'margin-top': vertical_spacing +'px'} );

				cb.call( img, target.width, target.height, vertical_spacing );
			}