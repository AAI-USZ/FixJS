function(input, index) {
		
			// if the support parameter is specified in the input declaration
			// then test it's a regular expression and compare it agains the
			// user agent. If the test fails then skip this input.
			if ( input.support && input.support instanceof RegExp && ! input.support.test(navigator.userAgent)) {
				return
			}
		
			// check if the input has a title.
			if ( input.title ) var label = util.createElement({'tag' : 'label', 'inner' : input.title})
		
			// check if the input is <select>
			if ( input.type && input.type == 'select' ) {
			
				// create a select input.
				var element = util.createElement({
					tag : 'select',
					attributes : {
						name : input.name
					}
				})
				
				// iterate the options.
				util.forEach(input.options, function(option) {
					
					// create an option element.
					var optionNode = util.createElement({
						tag : 'option',
						inner : option,
						appendTo : element,
						attributes : {
							value : option
						}
					})
					
					if ( input.placeholder && typeof input.placeholder == 'function' && option == input.placeholder() ) {
						optionNode.setAttribute('selected', 'selected')
						
					} else if ( input.placeholder && option == input.placeholder ) {
						optionNode.setAttribute('selected', 'selected')
					}
				})
			}
			
			// button input.
			else if ( input.type && input.type == 'button' && typeof input.callback == 'function' ) {
			
				var element = util.createElement({
					'tag' : 'button',
					'inner' : input.name
				})
			
				util.addListener(element, 'click', input.callback)
			
			}
			
			// if it's not a select element it's an input.
			else {
				
				var element = util.createElement({
					tag : 'input',
					attributes : {
						name : input.name || form.name + '-' + index,
						type : input.type || 'text'
					}
				})
				
				if ( input.type == 'checkbox' ) element.checked = input.checked || false
			}
			
			// check for a placeholder.
			if ( input.placeholder && input.type !== 'select' ) {
			
				if ( typeof input.placeholder == 'function' ) {
					input.placeholder = input.placeholder()
				}
			
				// check for native placeholder support.
				if ( 'placeholder' in element ) {
				
					element.setAttribute('placeholder', input.placeholder)
				}
				
				// if there is no native support then shim it.
				else {
					require(['model.placeholder'],function(Placeholder) {
					
						new Placeholder(element, input.placeholder)
					})
				}
			}
			
			// if the MDD specified an input title..
			if ( label ) {
				// append the input to the label
				label.appendChild(element)
				
				// and then the label to the form.
				formElement.appendChild(label)
			}
			
			// if the MDD specified no title for the input, append the input to the form.
			else formElement.appendChild(element)
		
			inputs.push(element)
		
			// check for a callback function...
			if ( form.callback ) {
			
				// bind the callback to enter.
				util.addListener(element, 'keyup', function(e) {
				
					if ( e.keyCode === 13 ) form.callback.call(ModalDialogue, inputs)
				})
			}
		}