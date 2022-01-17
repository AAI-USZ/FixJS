function( ev ) {
			var page = $( this ).val();
			showPage( page, null, true );
			ev.preventDefault(); // stop the UI changing
		}