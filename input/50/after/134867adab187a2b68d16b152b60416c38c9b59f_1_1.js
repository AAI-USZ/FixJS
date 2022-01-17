function() {
				$( this ).triggerHandler( 'afterStopEditing', [ save, wasPending ] );
				$( wikibase ).triggerHandler( 'stopItemPageEditMode', this );
			}