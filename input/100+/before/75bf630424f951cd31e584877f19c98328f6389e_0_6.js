function( button ) {
				var
					markup = jQuery('<'+button+'></'+button+'>'),
					rangeObject = Aloha.Selection.rangeObject,
					foundMarkup;
			
				if ( typeof button === "undefined" || button == "" ) {
					return false;
				}
			
				// check whether the markup is found in the range (at the start of the range)
				foundMarkup = rangeObject.findMarkup( function() {
					return this.nodeName.toLowerCase() == markup.get(0).nodeName.toLowerCase();
				}, Aloha.activeEditable.obj );

				if ( foundMarkup ) {
					// remove the markup
					if ( rangeObject.isCollapsed() ) {
						// when the range is collapsed, we remove exactly the one DOM element
						GENTICS.Utils.Dom.removeFromDOM( foundMarkup, rangeObject, true );
					} else {
						// the range is not collapsed, so we remove the markup from the range
						GENTICS.Utils.Dom.removeMarkup( rangeObject, markup, Aloha.activeEditable.obj );
					}
				} else {
					// when the range is collapsed, extend it to a word
					if ( rangeObject.isCollapsed() ) {
						GENTICS.Utils.Dom.extendToWord( rangeObject );
					}

					// add the markup
					GENTICS.Utils.Dom.addMarkup( rangeObject, markup );
				}
				// select the modified range
				rangeObject.select();
				return false;
			}