function( image, data ) {
		var first_char = image.substr( 0, 1 );
		var first_char_regex = RegExp.escape( first_char, true );
		if( first_char.toUpperCase() !== first_char.toLowerCase() ) {
			first_char_regex = '[' + RegExp.escape( first_char.toUpperCase(), true ) + RegExp.escape( first_char.toLowerCase(), true ) + ']';
		}
		var image_re_string = "(?:[Ii]mage|[Ff]ile):\\s*" + first_char_regex + RegExp.escape( image.substr( 1 ), true );
		var links_re = new RegExp( "\\[\\[" + image_re_string );
		var allLinks = Morebits.array.uniq(Morebits.string.splitWeightedByKeys( this.text, '[[', ']]' ));
		for( var i = 0; i < allLinks.length; ++i ) {
			if( links_re.test( allLinks[i] ) ) {
				var replacement = allLinks[i];
				// just put it at the end?
				replacement = replacement.replace( /\]\]$/, '|' + data + ']]' );
				this.text = this.text.replace( allLinks[i], replacement, 'g' );
			}
		}
		var gallery_re = new RegExp( "^(\\s*" + image_re_string + '.*?)\\|?(.*?)$', 'mg' );
		var newtext = "$1|$2 " + data;
		this.text = this.text.replace( gallery_re, newtext );
	}