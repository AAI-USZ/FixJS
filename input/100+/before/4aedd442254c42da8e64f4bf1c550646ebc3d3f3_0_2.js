function() {
		var scope = this;
		
		this.element.addEventListener( 'touchstart', function( event ) {
			scope.onTouchStart( event );
		}, false );

		this.element.addEventListener( 'touchmove', function( event ) {
			scope.onTouchMove( event );
		}, false );

		this.element.addEventListener( 'touchend', function( event ) {
			scope.onTouchEnd( event );
		}, false );
	}