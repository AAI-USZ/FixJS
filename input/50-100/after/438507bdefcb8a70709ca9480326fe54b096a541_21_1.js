function( context, headings ) {
		var html = '<tr>';
		for ( var i = 0; i< headings.length; i++ ) {
			html += '<th>' + $.wikiEditor.autoMsg( headings[i], ['html', 'text'] ) + '</th>';
		}
		return html + '</tr>';
	}