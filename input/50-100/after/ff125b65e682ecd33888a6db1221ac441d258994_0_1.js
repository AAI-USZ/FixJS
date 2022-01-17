function(){

			        //prevent flickering in phonegap container
        			$to.css("z-index", -10);

				$to.addClass( $.mobile.activePageClass + toPreClass );

				// Send focus to page as it is now display: block
				$.mobile.focusPage( $to );

				// Set to page height
				$to.height( screenHeight + toScroll );

				scrollPage();

				//restores visibility of the new page
        			$to.css("z-index", "");

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