function () {
			var that = this,
				handler, cc,
				contentHandler = [ 'word', 'generic', 'sanitize' ], //  'oembed' deactivated
				i, j = contentHandler.length;

			// Register available content handler
			for ( i = 0; i < j; i++ ) {
				handler = contentHandler[ i ];
				cc = handler.charAt( 0 ).toUpperCase() + handler.slice( 1 );
				ContentHandlerManager
					.register( handler, eval( cc + 'ContentHandler' ) );
			}
		}