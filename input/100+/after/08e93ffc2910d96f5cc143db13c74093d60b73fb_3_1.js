function( path, root ) {
		var end = path[ path.length - 1 ] == '/';

		if ( rhome.exec( path ) ) {
			path = process.env.HOME + '/' + path;
		}
		else if ( ! rpathprefix.exec( path ) ) {
			path = ( root || process.cwd() ) + '/' + path;
		}

		return ( path = PATH.normalize( path ) ) + ( end && path[ path.length - 1 ] != '/' ? '/' : '' );
	}