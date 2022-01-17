function() {
				var $select = $(this);				
				
				// Adds the textbox
				var $input = _inputAfter($select);
				
				// Disable tab on select elements
				_disableTabstop($select);
				
				// Watch the select for changes and update input right away
				_watchChanges($select, $input);
				
				// Keypress counter and repeater neutralizer
				_initKeypressCounter($input);
				
				// Autocompletes the input when typing
				_autocompleteInput($select, $input, _options.notfoundCss);
				
				// Expand on focus?
				if (_options.expandOnFocus) {
					_expandOnFocus($select, $input, _options.expandSize);
				}
				
				// Selects all text on focus in input element
				_selectallOnClick($input);
			}