function( asObject ) {
			var clonedObj = this.obj.clone( false );

			// do core cleanup
			clonedObj.find( '.aloha-cleanme' ).remove();
			this.removePlaceholder( clonedObj );
			PluginManager.makeClean( clonedObj );

			return asObject ? clonedObj.contents() : contentSerializer(clonedObj[0]);
		}