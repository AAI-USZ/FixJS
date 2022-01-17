function ( content, options ) {
			var handler,
				handlers = this.getEntries();

			if ( typeof options.contenthandler === 'undefined') {
				options.contenthandler = [];
				for ( handler in handlers ) {
					if ( handlers.hasOwnProperty(handler) ) {
						options.contenthandler.push(handler);
					}
				}
			}

			for ( handler in handlers ) {
				if ( handlers.hasOwnProperty(handler) ) {
					if (jQuery.inArray( handler, options.contenthandler ) < 0 ) {
						continue;
					}
					if (null == content) {
						break;
					}
					if ( typeof handlers[handler].handleContent === 'function') {
						content = handlers[handler].handleContent( content, options );
					} else {
						console.error( 'A valid content handler needs the method handleContent.' );
					}
				}
			}

			return content;
		}