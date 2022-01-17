function() {

		this.editableValue.simulateApiFailure();

		this.editableValue.startEditing();
		this.editableValue.setValue( this.strings['valid'][0] );

		equal(
			this.editableValue.isInEditMode(),
			true,
			'started editing ans set value'
		);

		this.editableValue.stopEditing( true );

		equal(
			this.editableValue.isInEditMode(),
			true,
			'is still in edit mode after receiving error'
		);

		ok(
			this.editableValue._toolbar.editGroup.btnSave._tooltip instanceof window.wikibase.ui.Tooltip,
			'attached tooltip to save button'
		);

		this.editableValue.simulateApiSuccess();

		this.editableValue.stopEditing();

		equal(
			this.editableValue.isInEditMode(),
			false,
			'cancelled editing'
		);

		this.editableValue.simulateApiFailure();

		this.editableValue.preserveEmptyForm = true;
		this.editableValue.remove();

		equal(
			this.editableValue.getValue()[0],
			this.editableValue.getInitialValue()[0],
			'emptied input interface resetting to default value and preserving the input interface'
		);

		this.editableValue.preserveEmptyForm = false;
		this.editableValue.remove();

		ok(
			this.editableValue._toolbar.editGroup.btnRemove.getTooltip() instanceof window.wikibase.ui.Tooltip,
			'attached tooltip to remove button after trying to remove with API action'
		);

		this.editableValue.simulateApiFailure( 1 );
		this.editableValue.startEditing();
		this.editableValue.setValue( this.strings['valid'][0] );
		this.editableValue.stopEditing( true );
		equal(
			this.editableValue._toolbar.editGroup.btnSave._tooltip._error.shortMessage,
			mw.msg( 'wikibase-error-save-generic' ),
			"when getting unknown error-code from API, generic message should be shown"
		);

		this.editableValue.simulateApiFailure( 2 );
		this.editableValue.startEditing();
		this.editableValue.setValue( this.strings['valid'][0] );
		this.editableValue.stopEditing( true );
		equal(
			this.editableValue._toolbar.editGroup.btnSave._tooltip._error.shortMessage,
			mw.msg( 'wikibase-error-ui-client-error' ),
			"when getting an registered error-code from API, the corresponding message should be shown"
		);

	}