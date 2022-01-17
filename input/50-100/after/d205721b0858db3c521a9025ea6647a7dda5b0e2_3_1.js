function( editableValue ) {
		this._editableValue = editableValue;

		window.wikibase.ui.Toolbar.Group.prototype._init.call( this );

		// overwrite tooltip message when editing is restricted
		$( wikibase ).on(
			'restrictItemPageActions',
			$.proxy(
				function( event ) {
					this.tooltipAnchor.getTooltip().setContent(
						mw.message( 'wikibase-restrictionedit-tooltip-message' ).escaped()
					);
					this.tooltipAnchor.getTooltip().setGravity( 'nw' );
				}, this
			)
		);

	}