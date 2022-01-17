function( content ) {
			// remove paragraph numbering
			this.removeParagraphNumbering( content );
			
			// transform lists
			this.transformListsFromWord( content );

			// transform titles
			this.transformTitles( content );
			
			// clean html
			this.cleanHtml( content );
		}