function() {
				if (this.tagName.toLowerCase() == 'select') {
					var defaultValue = $(this).find('option').first().val().trim()
					var changedValue = $(this).find('option:checked').first().val().trim()
					var areEqual = (defaultValue == changedValue);
					var deviation = (areEqual ? 0 : 0.10); // 25% deviation.
				} else {
					var defaultValue = this.defaultValue;
					var changedValue = this.value;
					var areEqual = (parseFloat(defaultValue) == parseFloat(changedValue));
					var deviation = Math.abs(Math.log(parseFloat(changedValue) / parseFloat(defaultValue)));
				}
				
				if (!areEqual) {
					var description = this.parentNode.firstChild.nodeValue.trim();
					var heading = $(this.parentNode.parentNode.parentNode).prev('h2').first().text();
					
					changes.push([ heading, description, changedValue, defaultValue, deviation ]);
				};
			}