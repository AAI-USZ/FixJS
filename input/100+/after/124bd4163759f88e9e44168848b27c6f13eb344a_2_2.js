function(width, height, spacing){
						var animateObj         = {},
							horizontal_spacing = 0;

						//calculate the horizontal spacing if the image is less than the width
						if ( width < screenWidth ) {
							var r = width / height;
							horizontal_spacing = (r * (screenHeight) ) / 2;
						}

						if (increment > 0) {
							$(this).css( {right:'-'+screenWidth + 'px'} );
							animateObj.right = horizontal_spacing + 'px';
						} else {
							$(this).css( {left:'-'+screenWidth + 'px'} );
							animateObj.left = horizontal_spacing+'px';
						}
						$('.mobileBoxTitle').html( $nextImage.attr('title') );
						$('.mobileBoxCounter').html( (newIndex+1) + ' of ' + group.length );
						$( '.mobileBox' ).append( this );
						$(this).animate(animateObj, 200);

					}