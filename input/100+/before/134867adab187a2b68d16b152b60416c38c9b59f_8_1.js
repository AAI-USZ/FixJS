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

		this.evInterface.setDisabled( true );
		equal(
			this.evInterface.isDisabled(),
			true,
			'disable'
		);
		ok(
			this.evInterface._inputElem.attr( 'disabled' ),
			true,
			'input element is disabled'
		);

		this.evInterface.setDisabled( false );
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