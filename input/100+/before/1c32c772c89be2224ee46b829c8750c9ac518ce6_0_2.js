function colorPickerProvider(hostEditor, pos) {

		// Only provide color picker if there is a HEX color under the cursor
		var colorToken = getColorTokenAtPos(hostEditor, pos);
		if (!colorToken) {
			return null;
		}

		// get an existing color picker and close it
		var colorPicker = _colorPickers[pos.line];
		if (colorPicker) {
			colorPicker.close();
			if (colorPicker.pos.ch === colorToken.pos.ch) {
				return null;
			}
		}

		// move the cursor to the beginning of the color definition
		hostEditor.setCursorPos(colorToken.pos.line, colorToken.pos.ch);

		// create a new color picker
		colorPicker = new InlineColorPicker(colorToken.color, colorToken.pos);
		colorPicker.onClose = onClose;
		colorPicker.load(hostEditor);
		_colorPickers[pos.line] = colorPicker;

		// resolve
		var result = new $.Deferred();
		result.resolve(colorPicker);
		return result.promise();
	}