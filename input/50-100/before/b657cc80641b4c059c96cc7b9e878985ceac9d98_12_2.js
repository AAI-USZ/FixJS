function() {
			var range = Aloha.Selection.getRangeObject(),
			    foundMarkup = this.findLangMarkup( range );

		    if ( foundMarkup ) {
		        // remove the abbr
		        GENTICS.Utils.Dom.removeFromDOM( foundMarkup, range, true );

		        // select the (possibly modified) range
		        range.select();
				FloatingMenu.setScope( 'Aloha.continousText' );
				langField.setTargetObject( null );
				FloatingMenu.doLayout();
		    }
		}