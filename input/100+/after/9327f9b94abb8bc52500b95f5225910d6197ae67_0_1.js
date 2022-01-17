function( file ) {
		console.log( timestamp(), '- processing file:       ', file );

		if ( !fs.existsSync( file ) ) {
			console.log( 'file: ', file, ' does not exist.' );
			switch ( params.file_err ) {
				case 'break'    : console.log( timestamp(), ' - terminating build.' ); return;
				case 'continue' : break;
			}
		}

		src += Templ8.format( '\n/* file: {0} */\n{1}\n', file.substring( file.lastIndexOf( '/' ) + 1 ), fs.readFileSync( file, params.encoding ) );
	}