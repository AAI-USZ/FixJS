function( event ) {
		var content,
			that = this,
			target = $( event ? event.target : this.element )
				.closest( this.options.items );

		// if aria-describedby exists, then the tooltip is already open
		if ( !target.length || target.attr( "aria-describedby" ) ) {
			return;
		}

		if ( !target.data( "tooltip-title" ) ) {
			target.data( "tooltip-title", target.attr( "title" ) );
		}

		target.data( "tooltip-open", true );

		content = this.options.content.call( target[0], function( response ) {
			// ignore async response if tooltip was closed already
			if ( !target.data( "tooltip-open" ) ) {
				return;
			}
			// IE may instantly serve a cached response for ajax requests
			// delay this call to _open so the other call to _open runs first
			setTimeout(function() {
				that._open( event, target, response );
			}, 1 );
		});
		if ( content ) {
			that._open( event, target, content );
		}
	}