function( e, triggered ) {
			// Firefox auto-escapes the location.hash as for v13 but
			// leaves the href untouched
			$.mobile._handleHashChange( path.parseUrl(location.href).hash );
		}