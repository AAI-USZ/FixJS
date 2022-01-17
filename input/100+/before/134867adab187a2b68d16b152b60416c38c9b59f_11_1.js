function() {

		ok(
			this.editGroup.innerGroup instanceof window.wikibase.ui.Toolbar.Group,
			'initiated inner edit group'
		);

		ok(
			this.editGroup.tooltipAnchor instanceof window.wikibase.ui.Toolbar.Label,
			'initiated tooltip'
		);

		ok(
			this.editGroup.btnEdit instanceof window.wikibase.ui.Toolbar.Button,
			'initiated edit button'
		);

		ok(
			this.editGroup.btnCancel instanceof window.wikibase.ui.Toolbar.Button,
			'initiated cancel button'
		);

		ok(
			this.editGroup.btnSave instanceof window.wikibase.ui.Toolbar.Button,
			'initiated save button'
		);

		ok(
			this.editGroup.btnRemove instanceof window.wikibase.ui.Toolbar.Button,
			'initiated remove button'
		);

		equal(
			this.editGroup.displayRemoveButton,
			true,
			'remove button will not be displayed'
		);

		equal(
			this.editGroup.renderItemSeparators,
			false,
			'item separators will not be displayed'
		);

		equal(
			this.editGroup.innerGroup.hasElement( this.editGroup.btnEdit ),
			true,
			'edit button is in inner group'
		);


	}