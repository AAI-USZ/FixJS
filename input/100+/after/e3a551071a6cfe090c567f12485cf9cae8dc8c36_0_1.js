function( event, searchText, brandNew, increase ) {
			function eq() {
				var self = $( this );
				if( self.data( 'title' ).toLowerCase().indexOf( searchText.toLowerCase() ) >= 0 || self.data( 'vendor' ).toLowerCase().indexOf( searchText.toLowerCase() ) >= 0 ) {
					return true;
				}
				return false;
			}
			// if brand new search string, re-search whole orders
			// else if text length is increasing, strip from current visible set
			// else add new matched result to visible set
			if( brandNew ) {
				Cart.searchSet = $( this ).children().filter( eq );
				var diff = 0;
				var a = Cart.phaseSet.filter( ':hidden' ).filter( eq );
				var b = Cart.phaseSet.filter( ':visible' ).filter( function() {
					return !eq.bind( this )();
				} );
				a.show();
				b.hide();
				$( this ).trigger( 'GalTrace.currentOrdersChanged', a.length - b.length );
			} else if( increase ) {
				Cart.searchSet = Cart.searchSet.filter( eq );
				var tmp = Cart.phaseSet.filter( ':visible' ).filter( function() {
					return !eq.bind( this )();
				} );
				tmp.hide();
				$( this ).trigger( 'GalTrace.currentOrdersChanged', -tmp.length );
			} else {
				Cart.searchSet = $( this ).children().filter( eq );
				var tmp = Cart.phaseSet.filter( ':hidden' ).filter( eq );
				tmp.show();
				$( this ).trigger( 'GalTrace.currentOrdersChanged', tmp.length );
			}
		}