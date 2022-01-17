function() {

		equal(
			this.propertyEditTool.isFull(),
			true,
			'is full'
		);

		equal(
			this.propertyEditTool.isInEditMode(),
			false,
			'is not in edit mode'
		);

		equal(
			this.propertyEditTool.isInAddMode(),
			false,
			'is not in add mode'
		);

		equal(
			this.propertyEditTool._getValueElems().length,
			0,
			'has no elements with values'
		);

		ok(
			this.propertyEditTool.getToolbar() instanceof wikibase.ui.Toolbar,
			'instantiated toolbar'
		);

	}