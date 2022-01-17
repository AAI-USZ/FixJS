function( ) {
				$( this ).attr( 'style', 'display:block;' );
				//$.collapsibleTabs.getSettings( $( $.collapsibleTabs.getSettings( $( ele ) ).expandedContainer ) )
				//	.shifting = false;
				// Do the above, except with guards for JS errors
				var data = $.collapsibleTabs.getSettings( $( this ) );
				if ( !data ) {
					return;
				}
				var expContainerSettings = $.collapsibleTabs.getSettings( $( data.expandedContainer ) );
				if ( !expContainerSettings ) {
					return;
				}
				expContainerSettings.shifting = false;
				$.collapsibleTabs.handleResize();
			}