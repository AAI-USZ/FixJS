function _inputAfter($select) {
		var $input = $('<input/>');
		
		// Default options for input
		$input.css({
			position: 'absolute'
		});
		
		// Save class so we can remove later if needed
		$input.addClass('jqcombo');
		
		// Position relative to select element
		_positionInput($select, $input);
		
		// Set text value to select value
		$input.val($select.find('option:selected').text());
		
		// Insert into DOM
		$select.after($input);
		
		// Return to callee with the new input element
		return $input;
	}