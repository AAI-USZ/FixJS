function() {
		// call prototypes base function to append toolbar itself:
		window.wikibase.ui.Toolbar.prototype._initToolbar.call( this );

		// create a group inside the group so we can separate the tooltip visually
		this.innerGroup = new window.wikibase.ui.Toolbar.Group();
		this.addElement( this.innerGroup );

		this.tooltipAnchor = new window.wikibase.ui.Toolbar.Label( $( '<span/>', {
			'class': 'mw-help-field-hint',
			style: 'display:inline;text-decoration:none;',
			html: '&nbsp;' // TODO find nicer way to hack Webkit browsers to display tooltip image (see also css)
		} ) );
		this.tooltipAnchor.setTooltip( this._editableValue.getInputHelpMessage() );

		// now create the buttons we need for basic editing:
		var button = window.wikibase.ui.Toolbar.Button;

		this.btnEdit = new button( mw.msg( 'wikibase-edit' ) );
		$( this.btnEdit ).on( 'action', $.proxy( function( event ) {
			this._editActionHandler();
		}, this ) );

		this.btnCancel = new button( mw.msg( 'wikibase-cancel' ) );
		$( this.btnCancel ).on( 'action', $.proxy( function( event ) {
			this._cancelActionHandler();
		}, this ) );

		this.btnSave = new button( mw.msg( 'wikibase-save' ) );
		$( this.btnSave ).on( 'action', $.proxy( function( event ) {
			this._saveActionHandler();
		}, this ) );

		// add 'edit' button only for now:
		this.innerGroup.addElement( this.btnEdit );

		// initialize remove button:
		this.btnRemove = new button( mw.msg( 'wikibase-remove' ) );
		$( this.btnRemove ).on( 'action', $.proxy( function( event ) {
			this._removeActionHandler();
		}, this ) );
		if ( this.displayRemoveButton ) {
			this.innerGroup.addElement( this.btnRemove );
		}

	}