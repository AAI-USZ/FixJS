function() {
		this.propertyEditTool._initSingleValue(
			$( '<div/>', {
				text: 'someValue'
			} )
		);

		var node = $( '<div/>' );
		var pet = new window.wikibase.ui.PropertyEditTool( node );
		pet._initSingleValue(
			$( '<div/>', {
				text: 'someOtherValue'
			} )
		);

		equal(
			this.propertyEditTool.isEnabled(),
			true,
			'1st edit tool is enabled'
		);

		equal(
			this.propertyEditTool.isEnabled(),
			true,
			'2nd edit tool is enabled'
		);

		equal(
			this.propertyEditTool._editableValues[0].startEditing(),
			true,
			'started edit mode for 1st edit tool'
		);

		equal(
			this.propertyEditTool.isEnabled(),
			true,
			'1st edit tool is still enabled'
		);

		equal(
			pet.isDisabled(),
			true,
			'2nd edit tool is disabled'
		);

		equal(
			pet.isEnabled(),
			false,
			'2nd edit tool is not enabled'
		);

		this.propertyEditTool._editableValues[0].stopEditing();

		equal(
			pet.isEnabled(),
			true,
			'2nd edit tool is enabled'
		);

		equal(
			this.propertyEditTool.isEnabled(),
			true,
			'1st edit tool is enabled'
		);

		pet.destroy();
		pet = null;
		node = null;

	}