function( event, force ) {
		var that = this,
			target = $( event ? event.currentTarget : this.element ),
			tooltip = this._find( target );

		// don't close if the element has focus
		// this prevents the tooltip from closing if you hover while focused
		if ( !force && this.document[0].activeElement === target[0] ) {
			return;
		}

		// only set title if we had one before (see comment in _open())
		if ( target.data( "ui-tooltip-title" ) ) {
			target.attr( "title", target.data( "ui-tooltip-title" ) );
		}

		target.removeAttr( "aria-describedby" );

		tooltip.stop( true );
		this._hide( tooltip, this.options.hide, function() {
			$( this ).remove();
			delete that.tooltips[ this.id ];
		});

		target.removeData( "tooltip-open" );
		target.unbind( "mouseleave.tooltip focusout.tooltip keyup.tooltip" );

		this._trigger( "close", event, { tooltip: tooltip } );
	}