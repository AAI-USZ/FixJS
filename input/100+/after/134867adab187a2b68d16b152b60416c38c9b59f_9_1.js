function() {

		equal(
			this.editableValue.isEnabled(),
			true,
			'is enabled'
		);

		equal(
			this.editableValue.isDisabled(),
			false,
			'not disabled'
		);

		equal(
			this.editableValue.disable(),
			true,
			'disabling'
		);

		equal(
			this.editableValue.isDisabled(),
			true,
			'disabled'
		);

		equal(
			this.editableValue.isEnabled(),
			false,
			'not enabled'
		);

		equal(
			this.editableValue.getToolbar().enable(),
			true,
			'enabling toolbar'
		);

		equal(
			this.editableValue.getElementsState(),
			wikibase.ui.ELEMENT_STATE.MIXED,
			'mixed state'
		);

		equal(
			this.editableValue.isDisabled(),
			false,
			'not disabled'
		);

		equal(
			this.editableValue.isEnabled(),
			false,
			'not enabled'
		);

		equal(
			this.editableValue.enable(),
			true,
			'enabling'
		);

		equal(
			this.editableValue.isEnabled(),
			true,
			'is enabled'
		);

		equal(
			this.editableValue.isDisabled(),
			false,
			'is not disabled'
		);

	}