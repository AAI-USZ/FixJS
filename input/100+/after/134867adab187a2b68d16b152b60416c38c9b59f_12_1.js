function() {

		equal(
			this.label.isDisabled(),
			false,
			'not yet disabled'
		);

		equal(
			this.label.setDisabled(),
			true,
			'disable, state changed'
		);

		equal(
			this.label.isDisabled(),
			true,
			'disabled'
		);

		equal(
			this.label.setDisabled( true ),
			true,
			'disabling one more'
		);

		equal(
			this.label.isDisabled(),
			true,
			'disabled'
		);

		equal(
			this.label.setDisabled( false ),
			true,
			'enable, state changed'
		);

		equal(
			this.label.isDisabled(),
			false,
			'enabled'
		);

		equal(
			this.label.setDisabled( false ),
			true,
			'enabling once more'
		);

		equal(
			this.label.isDisabled(),
			false,
			'enabled'
		);

		this.label.stateChangeable = false;

		equal(
			this.label.setDisabled( true ),
			true,
			'trying to disable without state being changeable'
		);

		equal(
			this.label.isDisabled(),
			false,
			'state did not change'
		);

	}