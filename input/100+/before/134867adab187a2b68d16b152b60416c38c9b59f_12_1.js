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
			this.label.setDisabled( true ),
			false,
			'disable but disabled already, state not changed'
		);

		equal(
			this.label.isDisabled(),
			true,
			'disabled now'
		);

		equal(
			this.label.setDisabled( false ),
			true,
			'enable, state changed'
		);

		equal(
			this.label.setDisabled( false ),
			false,
			'enable but enabled already, state not changed'
		);

		equal(
			this.label.isDisabled(),
			false,
			'disabled now'
		);
	}