function () {
				var data;
				$( this ).hide();
				// add the placeholder
				$( '<span class="placeholder" style="display: none;"></span>' ).insertAfter( this );
				// XXX: 'data' is undefined here, should the 'data' from the outer scope have
				// a different name?
				$( this ).detach().prependTo( target ).data( 'collapsibleTabsSettings', data );
				$( this ).attr( 'style', 'display: list-item;' );
				// $.collapsibleTabs.getSettings( $( $.collapsibleTabs.getSettings( $( ele ) ).expandedContainer ) )
				//		.shifting = false;
				// Do the above, except with guards for accessing properties of undefined.
				data = $.collapsibleTabs.getSettings( $( ele ) );
				if ( data ) {
					var expContainerSettings = $.collapsibleTabs.getSettings( $( data.expandedContainer ) );
					if ( expContainerSettings ) {
						expContainerSettings.shifting = false;
						$.collapsibleTabs.handleResize();
					}
				}
			}