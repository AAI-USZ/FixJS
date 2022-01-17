function( ev ) {
			var page = $( this ).val();
			showPage( page );
			ev.preventDefault(); // stop the UI changing
		}