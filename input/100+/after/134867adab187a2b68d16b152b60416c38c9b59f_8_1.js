function() {

		equal(
			this.evInterface.isActive(),
			true,
			'is active'
		);

		equal(
			this.evInterface.isInEditMode(),
			false,
			'is in edit mode'
		);

		equal(
			this.evInterface.startEditing(),
			true,
			'start editing'
		);

		equal(
			this.evInterface.setDisabled( true ),
			true,
			'disable'
		);

		equal(
			this.evInterface.isDisabled(),
			true,
			'disabled'
		);

		ok(
			this.evInterface._inputElem.attr( 'disabled' ),
			true,
			'input element is disabled'
		);

		equal(
			this.evInterface.setDisabled( false ),
			true,
			'enable'
		);

		equal(
			this.evInterface.isDisabled(),
			false,
			'enabled'
		);
		ok(
			typeof this.evInterface._inputElem.attr( 'disabled' ) == 'undefined',
			'input element is not disabled'
		);

		this.evInterface.setActive( false );
		equal(
			this.evInterface.isActive(),
			false,
			'deactivated'
		);

		equal(
			this.evInterface.isInEditMode(),
			false,
			'is not in edit mode'
		);

		equal(
			$( this.evInterface._getValueContainer()[0] ).children().length,
			0,
			'removed input element'
		);

		this.evInterface.setActive( true );
		equal(
			this.evInterface.isActive(),
			true,
			'activated'
		);

	}