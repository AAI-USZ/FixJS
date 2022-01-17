function(request, sender, sendResponse)
{
	if ( request.method == "loadCache" ) {

		var ls = {};

		for ( var i = 0; i < localStorage.length; i++ )
		{
			ls[ localStorage.key( i ) ] = localStorage.getItem( localStorage.key ( i ) );
		}

		sendResponse( ls );
	} else if ( request.method == "saveCache" ) {

		localStorage[ request.key ] = request.value;

    	sendResponse( {} );
	} else if ( request.method == "clearCache" ) {
		localStorage.clear();	

		sendResponse( {} );

    } else {
    	sendResponse( {} ); // snub them.
    }
}