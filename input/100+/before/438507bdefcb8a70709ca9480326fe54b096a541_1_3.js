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

		// grab the next appearing placeholder so we can use it for replacing
		var $target = $( data.expandedContainer ).find( 'span.placeholder:first' );
		var expandedWidth = data.expandedWidth;
		$moving.css( "position", "relative" ).css( ( rtl ? 'right' : 'left' ), 0 ).css( 'width', '1px' );
		$target.replaceWith( $moving.detach().css( 'width', '1px' ).data( 'collapsibleTabsSettings', data )
			.animate( { width: expandedWidth+"px" }, "normal", function( ) {
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
			} ) );
	}