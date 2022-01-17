function() {
			$( this ).jqmRemoveData( "collapsible-last" )
				.find( $.mobile.collapsible.prototype.options.heading )
				.find( "a" ).first()
				.removeClass( "ui-corner-top ui-corner-bottom" )
				.find( ".ui-btn-inner" )
				.removeClass( "ui-corner-top ui-corner-bottom" );
		}