function() {
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
			}