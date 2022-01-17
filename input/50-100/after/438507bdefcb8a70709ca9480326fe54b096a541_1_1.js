function () {
				$( this ).attr( 'style', 'display: block;' );
				//$.collapsibleTabs.getSettings( $( $.collapsibleTabs.getSettings( $( ele ) ).expandedContainer ) )
				//	.shifting = false;
				// Do the above, except with guards for accessing properties of undefined.
				var data = $.collapsibleTabs.getSettings( $( this ) );
				if ( data ) {
					var expContainerSettings = $.collapsibleTabs.getSettings( $( data.expandedContainer ) );
					if ( expContainerSettings ) {
						expContainerSettings.shifting = false;
						$.collapsibleTabs.handleResize();
					}
				}
			}