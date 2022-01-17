function() {
			$( this ).jqmRemoveData( "collapsible-last" )
				.find( ".ui-collapsible-heading" )
				.find( "a" ).first()
				.removeClass( "ui-corner-top ui-corner-bottom" )
				.find( ".ui-btn-inner" )
				.removeClass( "ui-corner-top ui-corner-bottom" );
		}