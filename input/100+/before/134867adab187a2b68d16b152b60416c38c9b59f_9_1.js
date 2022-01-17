function() {

		equal(
			this.editableValue.startEditing(),
			true,
			'started edit mode'
		);

		equal(
			this.editableValue.isInEditMode(),
			true,
			'is in edit mode'
		);

		this.editableValue.setValue( this.strings['valid'][0] );

		ok(
			this.editableValue.getValue() instanceof Array && this.editableValue.getValue()[0] == this.strings['valid'][0],
			'changed value'
		);

		equal(
			this.editableValue.stopEditing( false ).promisor.apiAction,
			wikibase.ui.PropertyEditTool.EditableValue.prototype.API_ACTION.NONE,
			"stopped edit mode, don't save value"
		);

		ok(
			this.editableValue.getValue()[0] != this.strings['valid'][0],
			'value not saved after leaving edit mode without saving value'
		);

		var deferred = this.editableValue.stopEditing( false );

		equal(
			deferred.promisor.apiAction,
			wikibase.ui.PropertyEditTool.EditableValue.prototype.API_ACTION.NONE,
			'stop edit mode again'
		);

		equal(
			this.editableValue.startEditing(),
			true,
			'started edit mode'
		);

		this.editableValue.setValue( this.strings['valid'][0] );

		ok(
			this.editableValue.getValue() instanceof Array && this.editableValue.getValue()[0] == this.strings['valid'][0],
			'changed value'
		);

		equal(
			this.editableValue.stopEditing( true ).promisor.apiAction,
			wikibase.ui.PropertyEditTool.EditableValue.prototype.API_ACTION.SAVE,
			'stopped edit mode, save'
		);

		equal(
			this.editableValue.isInEditMode(),
			false,
			'is not in edit mode'
		);

		this.editableValue.setValue( this.strings['valid'][1] );

		ok(
			this.editableValue.getValue() instanceof Array && this.editableValue.getValue()[0] == this.strings['valid'][1],
			'changed value'
		);

		equal(
			this.editableValue.startEditing(),
			true,
			'started edit mode'
		);

		equal(
			this.editableValue.startEditing(),
			false,
			'try to start edit mode again'
		);

		equal(
			this.editableValue.validate( [this.strings['invalid'][0]] ),
			false,
			'empty value not validated'
		);

		equal(
			this.editableValue.validate( [this.strings['valid'][0]] ),
			true,
			'validated input'
		);

		this.editableValue.setValue( this.strings['invalid'][0] );

		ok(
			this.editableValue.getValue() instanceof Array && this.editableValue.getValue()[0] == this.strings['invalid'][0],
			'set empty value'
		);

		equal(
			this.editableValue.isEmpty(),
			true,
			'editable value is empty'
		);

		ok(
			this.editableValue.getValue() instanceof Array && this.editableValue.getInitialValue()[0] == this.strings['valid'][1],
			'checked initial value'
		);

		equal(
			this.editableValue.valueCompare( this.editableValue.getValue(), this.editableValue.getInitialValue() ),
			false,
			'compared current and initial value'
		);

		this.editableValue.setValue( this.strings['valid'][1] );

		ok(
			this.editableValue.getValue() == this.strings['valid'][1],
			'reset value to initial value'
		);

		equal(
			this.editableValue.valueCompare( this.editableValue.getValue(), this.editableValue.getInitialValue() ),
			true,
			'compared current and initial value'
		);

		this.editableValue.remove();

	}