function(option) {
					
					// create an option element.
					var optionNode = util.createElement({
						tag : 'option',
						inner : option,
						appendTo : element,
						attributes : {
							value : option
						}
					})

					if ( input.placeholder && option == input.placeholder ) {
						optionNode.setAttribute('selected', 'selected')
					}
				}