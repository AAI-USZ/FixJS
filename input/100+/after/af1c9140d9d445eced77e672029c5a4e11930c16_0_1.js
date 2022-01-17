function() {
			var _field = $(this);
			
			// Don't even bother going further if this isn't one of the accepted input field types or elements.
			if ((_field[0].tagName.toLowerCase() === 'input' && $.inArray(_field.attr('type'), acceptedInputTypes)) === -1 && $.inArray(_field[0].tagName.toLowerCase(), acceptedElements) !== -1) {
				_info('Doh! The following '+this.tagName.toLowerCase()+', is not supported.', this);
				return true; // Equivalent to continue in a normal for loop.
			}

			var _label = _getLabel(this);
			var _placeholder = _field.attr('placeholder');

			// Check for the placeholder attribute first.
			if (_placeholder) {
				var _placeholderLabel = $('<label for="'+(_field.attr('id') || _field.attr('name'))+'">'+_placeholder+'</label>');

				// If there isn't a label for this field, create one, otherwise replace the existing one with the placeholder one.
				if (_label.length === 0) {
					_label = _placeholderLabel;
					_field.prev(_label);
				} else {
					_label.replaceWith(_placeholderLabel);
				}
				_field.removeAttr('placeholder');
			}
			
			// Make sure this form field has a label
			if (_label.length === 0) {
				_info('Doh! The following '+this.tagName.toLowerCase()+' has no related label.', this);
				return true;
			}

			// Position the labels above the form fields. Note:We do this here and not in the CSS for the purposes of progressive enhancement.
			_prepLabel(_field, _label);
			
			// Select boxes don't need to have any fancy label stuff done.
			if (!this.tagName.match(/select/i)) {
				// What happens when we enter the field
				_field.focus(_focus);
				// What happens when we leave the field.
				_field.blur(_blur);
				_field.change(_blur);
				// Autofil bug fixes
				_field.bind('input', _keyup); // For the currently selected field.
				_field.bind('propertychange', _blur);
				// Check for when the user is typing
				_field.keyup(_keyup);
				// Make sure the field gets focus when the label is clicked on (for those people who don't use the 'for' attribute and deserve a kick to the face).
				_label.click(function() { _field.focus(); });
			}
		}