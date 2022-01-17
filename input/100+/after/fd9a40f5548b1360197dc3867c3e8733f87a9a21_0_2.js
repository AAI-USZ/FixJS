function show ( error, origin, lineNumber ) {
		
        var errorType, $element;
        
        // if error type in list
		
        if ( errorTypes.indexOf( error ) !== -1 ) {
			
			errorType = error;
			
        }
		// else use general type
		else {
			
			errorType = errorTypeGeneral;
			
		}
		
		// find dom element
		
		$element = $( "#" + errorStringBase + errorType );
		
		// show
		
		main.dom_collapse( {
			element: $element,
			show: true
		} );
        
        // store
		
        errorCurrent.$element = $element;
		
    }