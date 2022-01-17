function() {
							mouseOver = true;

							// Clear timer, if necessary
							if( settings.pauseOnHover ) {
								clearTimeout( autoplayInt );
								autoplayInt = 0;
							}
						}