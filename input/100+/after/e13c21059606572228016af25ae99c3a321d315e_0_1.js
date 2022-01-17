function(err, html, info) {
			if(err) {if(cb) cb.call(el, err); return;}
			try
			{
				//Start preserving the element in focus, if necessary
				var focus = document.activeElement,
					$ = jQuery,
					preserve = jQuery && //jQuery is required
						//if <body> is in focus, ignore preservation
						! $(focus).is("body") &&
						//the element must have an 'id' or a 'name' and a parent with an 'id'
						(focus.id || (focus.parentNode.id && focus.name) ) &&
						//Make sure that this node is a descendant of `el`
						$(focus).parents().index(el) >= 0;
				if(preserve)
				{
					//Setup the new element query now because the 'id' attribute will be deleted soon
					var newElementQuery = focus.id ? "#" + focus.id :
						"#" + focus.parentNode.id + " > [name=" + focus.name + "]",
						tmpValue = focus.value;
					//Save the selection, if needed
					if($(focus).is("input[type=text],input[type=password],textarea"))
						var selectionStart = focus.selectionStart,
							selectionEnd = focus.selectionEnd;
					//Remove event handlers and attributes; in Chrome, 'blur' and possibly 'change'
					//events are fired when an in-focus element is removed from the DOM
					$(focus).off();
					for(var i = focus.attributes.length - 1; i >= 0; i--)
						focus.removeAttributeNode(focus.attributes.item(i) );
					focus.onchange = focus.onblur = null;
					//Now it's safe to call blur and remove this element from the DOM
					focus.blur();
				}
				//Insert newly rendered content (jQuery is not required here)
				if(el.html)
					el.html(html);
				else
					el.innerHTML = html;
				//Preserve element value, focus, cursor position, etc.
				if(preserve)
				{
					//Find new element in newly rendered content
					var newElement = $(newElementQuery);
					//If found, do element preservation stuff...
					if(newElement.length == 1)
					{
						var oldValue = $(newElement).val(); //Save the value that's currently in the model
						newElement = newElement[0];
						newElement.focus(); //Give the new element focus
						if(document.activeElement === newElement)
						{
							//Set value to the temporary value and setup blur event handler to trigger `change`, if needed
							$(newElement).val(tmpValue).blur(function(e) {
								$(this).unbind(e);
								if(this.value !== oldValue)
									$(this).trigger('change');
							});
							//Set focus again and set cursor & text selection
							newElement.focus();
							if($(newElement).is("input[type=text],input[type=password],textarea"))
							{
								newElement.selectionStart = selectionStart;
								newElement.selectionEnd = selectionEnd;
							}
						}
					}
				}
				//Register event handlers
				for(var i in info.eventHandlers)
				{
					var events = info.eventHandlers[i].events.split(" "),
						elem = document.getElementById(i);
					for(var j = 0; j < events.length; j++)
						if(elem === newElement && events[j] == "change")
							(function(elem, handler) {
								elem['on' + events[j]] = function() {
									setTimeout(function() {
										elem['on' + events[j]] = handler; //put everything back
									}, 1);
									//intercept event, if needed
									if(this.value !== oldValue)
										//call original handler
										return handler.apply(this, arguments);
								};
							})(elem, info.eventHandlers[i].handler);
						else
							elem['on' + events[j]] = info.eventHandlers[i].handler;
					//Delete comment before element
					elem.parentNode.removeChild(elem.previousSibling);
				}
				if(cb) cb.call(el, null, html, info);
			}
			catch(e) {if(cb) cb.call(el, e);}
		}