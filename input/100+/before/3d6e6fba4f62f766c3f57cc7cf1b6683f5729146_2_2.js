function(width, height, spacing){
						var animateObj = {};

						if (increment > 0) {
							$(this).css( {right:'-'+screenWidth + 'px'} );
							animateObj.right = '0px';
						} else {
							$(this).css( {left:'-'+screenWidth + 'px'} );
							animateObj.left = '0px';
						}
						$('.mobileBoxTitle').html( $nextImage.attr('title') );
						$('.mobileBoxCounter').html( (newIndex+1) + ' of ' + group.length );
						$( '.mobileBox' ).append( this );
						$(this).animate(animateObj, 200);

					}