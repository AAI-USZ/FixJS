function( path, root ) {
		if ( rhome.exec( path ) ) {
			path = process.env.HOME + '/' + path;
		}
		else if ( ! rpathprefix.exec( path ) ) {
			path = ( root || process.cwd() ) + '/' + path;
		}

		return PATH.normalize( path ) + ( path[ path.length - 1 ] == '/' ? '/' : '' );
	}