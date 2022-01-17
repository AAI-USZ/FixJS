function( asObject ) {
			// Cloned nodes are problematic in IE7.  When trying to read/write
			// to them, they can sometimes cause the browser to crash.
			//var clonedObj = this.obj.clone( false );

			var clonedObj = jQuery(this.obj[0].outerHTML);

			// do core cleanup
			clonedObj.find( '.aloha-cleanme' ).remove();
			this.removePlaceholder( clonedObj );
			PluginManager.makeClean( clonedObj );

			return asObject ? clonedObj.contents() : contentSerializer(clonedObj[0]);
		}