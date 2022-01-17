function( asObject ) {
			var clonedObj = this.obj.clone( false );

			// do core cleanup
			clonedObj.find( '.aloha-cleanme' ).remove();
			this.removePlaceholder( clonedObj );
			PluginManager.makeClean( clonedObj );

			/*
			//also deactivated for now. like initEditable. just in case ...
			var content = clonedObj.html()
			if ( typeof Aloha.settings.contentHandler.getContents === 'undefined' ) {
				Aloha.settings.contentHandler.getContents = Aloha.defaults.contentHandler.getContents;
			}
			content = ContentHandlerManager.handleContent( content, {
				contenthandler: Aloha.settings.contentHandler.getContents
			} );
			clonedObj.html( content );
			*/

			return asObject ? clonedObj.contents() : clonedObj.html();
		}