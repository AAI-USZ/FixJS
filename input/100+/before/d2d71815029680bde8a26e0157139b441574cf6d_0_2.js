function( options ) {

			var defaults = {
				'emptyFieldBgColor' : '#FF6B6B',
				'error-message' : 'Please complete the form'
			};

			var settings = $.extend(defaults, options);

			var selectedForm = this;

			initForm();

			return this.submit(function() {
				var currentElement;
				var formValid = true;
				$('.required', this).each(function() {
					currentElement = this;
					if ($(currentElement).is('input[type="text"]')) {
						if ( fieldIsEmpty( $(currentElement).val() ) ) {
							changeBackgroundColor(currentElement);
							formValid = false;
						} else {
							returnBackgroundColor(currentElement);
						}
					}
					if ($(currentElement).is('select')) {
						if (fieldIsEmpty($(':selected', currentElement).val())) {
							changeBackgroundColor(currentElement);
							formValid = false;
						} else {
							returnBackgroundColor(currentElement);
						}
					}
				});	
				return formValid;
			});

			function returnBackgroundColor(element) {
				$(element).css('background-color', 'white');
			}

			function changeBackgroundColor(element) {
				$(element).css('background-color', defaults.emptyFieldBgColor);
			}

			function fieldIsEmpty(fieldValue) {
				fieldValue = $.trim(fieldValue);
				if (fieldValue == null) {
					return true;
				}
				if (fieldValue == '') {
					return true;
				}
				if (fieldValue.length == 0) {
					return true;
				}
				return false;
			}

			function initForm() {
				selectedForm.find('.required').each(function() {
					$(this).parent().find('label').append('<span style="color: red;">*</span>');
				});
			};
		}