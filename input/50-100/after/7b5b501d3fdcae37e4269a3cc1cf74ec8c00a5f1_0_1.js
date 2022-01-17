function() {
				var $select = $(this);
				
				// Adds jqcombo class to $select
				$select.addClass('jqcombo');
				
				// Adds the textbox
				var $input = _inputAfter($select);
				
				// Position relative to $select
				_positionInput($select, $input);
				
				// Disable tab on select elements
				_disableTabstop($select);
				
				// Watch the select for changes and update input right away
				_watchChanges($select, $input);
				
				// Keypress counter and repeater neutralizer
				_initKeypressCounter();
				
				// Autocompletes the input when typing
				_autocompleteInput($select, $input, _options.notfoundCss);
				
				// Expand on focus?
				if (_options.expandOnFocus) {
					_expandOnFocus($select, $input, _options.expandSize);
				}
				
				// Selects all text on focus in input element
				_selectallOnClick($input);
			}