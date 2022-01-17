function ( event ) {

		var dx = event.screenX - onMouseDownScreenX;
		var dy = event.screenY - onMouseDownScreenY;

		scope.dom.innerText = ( onMouseDownValue + ( dx - dy ) / ( event.shiftKey ? 10 : 100 ) ).toFixed( 0 );
		scope.onChangedCallback();

	}