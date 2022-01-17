function previousFragment() {
		var fragments = document.querySelectorAll( '.present .fragment.visible' );

		if( fragments.length ) {
			fragments[ fragments.length - 1 ].classList.remove( 'visible' );

			return true;
		}

		return false;
	}