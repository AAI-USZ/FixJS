function(req, res) {

	var character = req.params.character;
	var in_url = req.params.in_url || '';

	if( characters.indexOf( character.toLowerCase() ) === -1 ) {
		res.send( "I don't know who that character is", 404 );
	} else {
		url = decodeURIComponent( in_url );
		if( url && !url.match( /^https?:\/\//i ) && !url.match( /^data:/i ) ) {
			url = "http://" + url;
		}

		res.render('index.html', {
			source: url,
			characters: characters,
			character: character,
			original: baseurl + character + ".png"
		} );
	}

}