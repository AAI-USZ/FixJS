function nextFragment() {
		var fragments = document.querySelectorAll( '.present .fragment:not(.visible)' );

		if( fragments.length ) {
			fragments[0].classList.add( 'visible' );

			return true;
		}

		return false;
	}