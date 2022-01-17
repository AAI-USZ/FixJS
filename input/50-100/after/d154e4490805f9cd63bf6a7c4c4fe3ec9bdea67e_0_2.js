function (i, valueControl) {
				if (that.conditions[i].attribute === attribute.key) {
					var $this = $(this);

					// remove all except current val
					$this.find('option[value!="' + $this.val() + '"]').remove();

					//console.log("adding available options: " + availableOptions.length);

					// add back the other available options
					$.each(availableValues, function (i, option) {
						$this.append('<option>' + option + '</option>');
					});
				}
			}