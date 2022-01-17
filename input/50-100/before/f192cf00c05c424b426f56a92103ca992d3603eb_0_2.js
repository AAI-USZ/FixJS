function ( event ) {

		var dx = event.screenX - onMouseDownScreenX;
		var dy = event.screenY - onMouseDownScreenY;

		scope.dom.innerText = ( onMouseDownValue + ( dx - dy ) / 100 ).toFixed( 2 ); 
		scope.onChangedCallback();

	}