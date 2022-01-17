function( ele ) {
		var $moving = $( ele );
		
		//$.collapsibleTabs.getSettings( $( $.collapsibleTabs.getSettings( $moving ).expandedContainer ) ).shifting = true;
		// Do the above, except with guards for JS errors
		var data = $.collapsibleTabs.getSettings( $moving );
		if ( !data ) {
			return;
		}
		var expContainerSettings = $.collapsibleTabs.getSettings( $( data.expandedContainer ) );
		if ( !expContainerSettings ) {
			return;
		}
		expContainerSettings.shifting = true;

		// Remove the element from where it's at and put it in the dropdown menu
		var target = data.collapsedContainer;
		$moving.css( "position", "relative" )
			.css( ( rtl ? 'left' : 'right' ), 0 )
			.animate( { width: '1px' }, "normal", function() {
				$( this ).hide();
				// add the placeholder
				$( '<span class="placeholder" style="display:none;"></span>' ).insertAfter( this );
				$( this ).detach().prependTo( target ).data( 'collapsibleTabsSettings', data );
				$( this ).attr( 'style', 'display:list-item;' );
				//$.collapsibleTabs.getSettings( $( $.collapsibleTabs.getSettings( $( ele ) ).expandedContainer ) )
				//	.shifting = false;
				// Do the above, except with guards for JS errors
				var data = $.collapsibleTabs.getSettings( $( ele ) );
				if ( !data ) {
					return;
				}
				var expContainerSettings = $.collapsibleTabs.getSettings( $( data.expandedContainer ) );
				if ( !expContainerSettings ) {
					return;
				}
				expContainerSettings.shifting = false;
				$.collapsibleTabs.handleResize();
			} );
	}