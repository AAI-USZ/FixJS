function( e ) {
		var self = this;

		if ( e ) {
			Nodelint.Color.red( "\n\nFatal Error\n" );
			console.error( e );
			if ( e.stack ) {
				console.error( e.stack );
			}

			process.exit( 1 );
			return;
		}

		self.passed();
		self.warnings();
		self.errors();
		self.totals();
	}