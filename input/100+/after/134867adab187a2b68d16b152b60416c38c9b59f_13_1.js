function() {
		var label = new window.wikibase.ui.Toolbar.Label( 'label text' );
		label.stateChangeable = false;
		this.toolbar.addElement( label );

		equal(
			this.toolbar.isStateChangeable(),
			false,
			'toolbar state is not changeable (no elements that are changeable)'
		);

		var button = new window.wikibase.ui.Toolbar.Button( 'button text' );
		this.toolbar.addElement( button );

		equal(
			this.toolbar.isStateChangeable(),
			true,
			'toolbar state is changeable'
		);

		equal(
			this.toolbar.disable(),
			true,
			'disabling toolbar'
		);

		equal(
			this.toolbar.isDisabled(),
			true,
			'toolbar is disabled'
		);

		label.stateChangeable = true;

		equal(
			this.toolbar.getElementsState(),
			wikibase.ui.ELEMENT_STATE.MIXED,
			'mixed state after making label changeable'
		);

		equal(
			this.toolbar.isDisabled(),
			false,
			'toolbar is not disabled (since element states are mixed)'
		);

		equal(
			this.toolbar.isEnabled(),
			false,
			'toolbar is not enabled (since element states are mixed)'
		);

		equal(
			this.toolbar.enable(),
			true,
			'enabling toolbar'
		);

		equal(
			this.toolbar.isEnabled(),
			true,
			'toolbar is enabled'
		);

		equal(
			this.toolbar.disable(),
			true,
			'disabling toolbar'
		);

		equal(
			this.toolbar.isDisabled(),
			true,
			'toolbar is disabled'
		);

		equal(
			this.toolbar.isEnabled(),
			false,
			'toolbar is not enabled'
		);

	}