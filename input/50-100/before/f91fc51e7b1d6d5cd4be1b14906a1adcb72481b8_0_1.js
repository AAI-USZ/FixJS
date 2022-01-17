function( e ) {
  if( e.keyCode == 122 ) { // f11
    
    e.preventDefault();
    
  	if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) {
  		RunPrefixMethod(document, "CancelFullScreen");
  	}
  	else {
  		RunPrefixMethod(el, "RequestFullScreen", Element.ALLOW_KEYBOARD_INPUT );
  	}
  }
}