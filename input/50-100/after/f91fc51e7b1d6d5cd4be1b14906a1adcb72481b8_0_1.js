function( e ) {
  
	toogleFullscren = function() {
		
		if( RunPrefixMethod( document, "FullScreen" ) 
		|| RunPrefixMethod( document, "IsFullScreen" ) ) {
			
			RunPrefixMethod( document, "CancelFullScreen" );
		}
		else {
			RunPrefixMethod( el, "RequestFullScreen", Element.ALLOW_KEYBOARD_INPUT );
		}  
	}

	if( e.keyCode == 122 												// F11 (windows) 
		|| ( e.shiftKey && e.metaKey && e.keyCode == 70 ) ) { // or Command + Shift + F (mac)

		e.preventDefault();

		toogleFullscren();
	}
}