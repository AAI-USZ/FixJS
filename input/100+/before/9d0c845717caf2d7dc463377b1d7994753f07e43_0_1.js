function saveTimetable()
{
	var tokens = $.map( $( "td" ), function( element )
	{
		var name = $( element ).find( ".name" ).html()
	
		if( name == null || name == "" ) 
			return;
		else
			name = name.replace( /:|\.|_|,/g, "" ).replace( " ", "_" );

		var room = $( element ).find( ".room" ).html()
		
		if( room == null )
			room = "";
		else
			room = room = room.replace( /:|\.|_|,|\(|\)/g, "" ).replace( " ", "_" );
			
		var length = $( element ).attr( "rowspan" );
		var coords = decodeCoords( element );

		var base_encoding = coords.x + ":" + coords.y + "," + name + "," + room;
		
		if( length > 1 ) // include the length and the repeat
			base_encoding += "," + length;

		return base_encoding;
	} );
	
	// Look for similar tokens and compress them
	for( var i = 0; i < tokens.length; i++ )
	{
		for( var j = 0; j < tokens.length; j++ )
		{
			if( j != i )
			{
				var temp_subject_two = tokens[ j ].substring( 0, 2 ) + tokens[ i ][ 2 ] + tokens[ j ].substring( 3 );

				/* If they are now equal then the only difference was y and based on this information
				 * we can now compress it.
				 */
				if( tokens[ i ] == temp_subject_two )
				{
					var token_length = tokens[ i ].split( "," ).length;
					
					if( token_length == 4 )
						tokens[ i ] += "+" + tokens[ j ][ 2 ];
					else
						tokens[ i ] += ",+" + tokens[ j ][ 2 ];
				
					tokens[ j ] = "";
				}
			}
		}
	}

	var generated_state = encodeURI( tokens.join(".").replace( /\.\./g, "." ).replace( /(\.$)/g, "" ) );
	
	// save the generated state in the URL	
	var url = $( location ).attr( "href" );
	if( url.match( /#.*?$/ ) )
		$( location ).attr( "href", url.replace( /#.*?$/, "#" + generated_state ) );
	else
		$( location ).attr( "href", url + "#" + generated_state );
}