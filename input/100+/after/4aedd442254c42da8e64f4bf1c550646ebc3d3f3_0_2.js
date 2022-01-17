function() {
		var scope = this;

		this.touchStartDelegate = function( event ) {
			scope.onTouchStart( event );
		};

		this.touchMoveDelegate = function( event ) {
			scope.onTouchMove( event );
		};

		this.touchEndDelegate = function( event ) {
			scope.onTouchEnd( event );
		};

		this.element.addEventListener( 'touchstart', this.touchStartDelegate, false );
		this.element.addEventListener( 'touchmove', this.touchMoveDelegate, false );
		this.element.addEventListener( 'touchend', this.touchEndDelegate, false );
	}