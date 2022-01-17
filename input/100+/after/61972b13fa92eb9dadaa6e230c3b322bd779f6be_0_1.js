f	var diff = count - 1;
	if( diff > 0 ) {
		var start = style.search( /\/\* A.*\n-*\*\// ),
        	end = style.search( /\/\* Structure /),
 			swatch_a = style.substring( start, end );
		
		for( var i = 0; i < diff; i++) {
			var letter = String.fromCharCode( i + 98 );
	
			var temp_style_template = swatch_a.replace( /-a,/g, "-" + letter + "," ).replace( /-a\s/g, "-" + letter + " " )
				.replace( /-a\:/, "-" + letter + ":" ).replace( /{a-/g, "{" + letter + "-" ).replace( /\/\*\sA/, "/* " + letter.toUpperCase() );
			
			style = style.replace( /\/\*\sStructure\s/, temp_style_template + "\n\n/* Structure " );
		}
	}
	return style;
}
