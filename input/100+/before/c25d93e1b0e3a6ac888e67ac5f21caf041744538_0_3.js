function lowsrc ($dropBox, imageURI) {

			/* This code does the same thing as the lowsrc attribute used to do.  This should
			   be easy, but lowsrc no longer exists in HTML5, and Chrome has dropped support for it.

			   reference: http://www.ssdtutorials.com/tutorials/title/html5-obsolete-features.html */

			var $img = $dropBox.find( 'img' );
			$img[0].src = INNERCONTEXT.CONSTANTS.THROBBER;
			$img.css( 'padding-top', '20px' );
			var realImg = new Image();
			realImg.src = imageURI;
			realImg.onload = function lowsrc_onload () {
				$img.data( 'resolution', realImg.naturalWidth + ' x ' + realImg.naturalHeight );
				$.ajax(
					{ url: realImg.src
					, success: function lowsrc_onload_success ( request ) {
						$img.data( 'size', INNERCONTEXT.UTILITY.addCommas( request.length ))
						    .prop( 'src', realImg.src )
						    .css( 'padding-top', '0px' );
					}
				});
			};
		}