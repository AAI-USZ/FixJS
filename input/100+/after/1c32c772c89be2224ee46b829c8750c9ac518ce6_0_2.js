function colorPickerProvider(hostEditor, pos) {

		// Only provide color picker if there is a HEX color under the cursor
		var colorToken = getColorTokenAtPos(hostEditor, pos);
		if (!colorToken) {
			return null;
		}

		// update the position to the color start
		pos.ch = colorToken.start;

		// get an existing color picker and close it
		var colorPicker = _colorPickers[pos.line];
		if (colorPicker) {
			colorPicker.close();
			if (pos.ch === colorPicker.pos.ch) {
				return null;
			}
		}


		// create a new color picker
		colorPicker = new InlineColorPicker(colorToken.string, pos);
		colorPicker.onClose = onClose;
		colorPicker.load(hostEditor);
		_colorPickers[pos.line] = colorPicker;

		// resolve
		var result = new $.Deferred();
		result.resolve(colorPicker);
		return result.promise();
	}