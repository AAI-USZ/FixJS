function() {
			var $this = $( this );
			var maxHeight = 0;
			var gallery   = $this.find( 'ul' );
			var galleryId = "#" + gallery.attr( "id" );
			var previous  = $this.prev( 'p' ).children( 'br' );

			// The gallery parser comes with a preceding empty <p> element
			// this is a work-around to avoid
			if ( previous.length == 1 ) {
				previous.hide();
			}

			// Make elements visible / hide
			$this.find( '.processing' ).hide();
			gallery.show();

			// Loop over all the gallery items
			gallery.find( 'li' ).each( function () {

				// Determine height because text elements can change the max height
				if($(this).height() > maxHeight ) {
					maxHeight = $( this ).height();
				}
			} );

			// Set the max height, so all elements are equally positioned
			gallery.height( maxHeight );

			if( !gallery.responsiveSlides({
				pauseControls: gallery.attr( 'data-nav-control' ) === 'auto',
				prevText: gallery.attr( 'data-previous' ),
				nextText: gallery.attr( 'data-next' ),
				auto:  gallery.attr( 'data-nav-control' ) === 'auto',
				pause: gallery.attr( 'data-nav-control' ) === 'auto',
				pager: gallery.attr( 'data-nav-control' ) === 'pager',
				nav:   gallery.attr( 'data-nav-control' ) === 'nav'
			} ) ) {
				// something went wrong, hide the canvas container
				$this.find( galleryId ).hide();
			}
/* End javascript *************************************************************/
		}