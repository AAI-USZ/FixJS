function( content ) {
		wikibase.ui.Toolbar.Label.prototype._init.call( this, content );

		// disable button and attach tooltip when editing is restricted
		$( wikibase ).on(
			'restrictItemPageActions',
			$.proxy(
				function( event ) {
					this.disable();
					this.setTooltip(
						mw.message( 'wikibase-restrictionedit-tooltip-message' ).escaped()
					);
					this._tooltip.setGravity( 'nw' );
				}, this
			)
		);

	}