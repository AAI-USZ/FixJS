function() {
			var classes = [ nsClass( 'wrapper' ), nsClass( ++uid ) ].join( ' ' );
			var markup = jQuery( supplant(
					'<blockquote class="{classes}" data-cite-id="{uid}"></blockquote>',
					{ uid: uid, classes: classes }
				) );

			// Now re-enable the editable...
			if ( Aloha.activeEditable ) {
				jQuery( Aloha.activeEditable.obj[ 0 ] ).click();
			}

			Aloha.Selection.changeMarkupOnSelection( markup );

			if ( this.referenceContainer ) {
				this.addCiteToReferences( uid );
			}

			if ( this.sidebar && this.settings && this.settings.sidebar &&
			     this.settings.sidebar.open ) {
				this.sidebar.open();
			}
			//	.activatePanel(nsClass('sidebar-panel'), markup);
		}