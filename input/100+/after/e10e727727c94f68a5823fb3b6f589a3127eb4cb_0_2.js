function( obj, setCursor ) {
			var placeholderClass = this.placeholderClass,
			    range;
			if (jQuery( "." + this.placeholderClass, obj).length === 0) {
				return;
			} 
			// set the cursor // remove placeholder
			if ( setCursor === true ) {
				window.setTimeout( function() {
					range = new Selection.SelectionRange();
					range.startContainer = range.endContainer = obj.get( 0 );
					range.startOffset = range.endOffset = 0;
					jQuery( '.' + placeholderClass, obj ).remove();
					range.select();
				
				}, 100 );
			} else {
				jQuery( '.' + placeholderClass, obj ).remove();
			}
		}