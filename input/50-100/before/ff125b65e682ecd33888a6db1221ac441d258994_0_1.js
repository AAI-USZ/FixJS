function(){

				$to.addClass( $.mobile.activePageClass + toPreClass );

				// Send focus to page as it is now display: block
				$.mobile.focusPage( $to );

				// Set to page height
				$to.height( screenHeight + toScroll );

				scrollPage();

				if( !none ){
					$to.animationComplete( doneIn );
				}

				$to
					.removeClass( toPreClass )
					.addClass( name + " in" + reverseClass );

				if( none ){
					doneIn();
				}

			}