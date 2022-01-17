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
					//Save the ID and value of this element
					var id = focus.id, oldValue, tmpValue,
						newElementQuery = id ? "#" + id :
							"#" + focus.parentNode.id + " > [name=" + focus.name + "]";
					//Save the selection, if needed
					if($(focus).is("input[type=text],input[type=password],textarea"))
					{
						var selectionStart = focus.selectionStart,
							selectionEnd = focus.selectionEnd;
					}
					//Remove event handlers and attributes; in Chrome, 'blur' and possibly 'change'
					//events are fired when an in-focus element is removed from the DOM
					while(focus.attributes.length > 0)
						focus.removeAttributeNode(focus.attributes.item(0) );
					//Add a "change" event handler. When in-focus elements are removed from,
					//the DOM, 'blur' or 'change' might be triggered.
					focus.onchange = function(e) {
						tmpValue = focus.value;
						return false; //prevent the change from occurring
					};
					//Remove all children and any leftover event handlers
					//(although blur might still fire if the event handler could not be removed)
					focus = focus.cloneNode();
				}
				//Insert newly rendered content (jQuery is not required here)
				if(el.html)
					el.html(html);
				else
					el.innerHTML = html;
				//Preserve element focus, cursor position, etc.
				if(preserve)
				{
					//Find new element in newly rendered content
					var newElement = $(newElementQuery);
					//If found, do element preservation stuff...
					if(newElement.length == 1)
					{
						//Replace newElement
						newElement.replaceWith(focus);
						newElement = newElement[0];
						oldValue = newElement.value;
						//Add new child nodes and attributes
						while(newElement.childNodes.length > 0)
						{
							var child = newElement.childNodes.item(i);
							newElement.removeChild(child);
							focus.appendChild(child);
						}
						while(newElement.attributes.length > 0)
						{
							var attr = newElement.attributes.item(i);
							newElement.removeAttributeNode(attr);
							focus.setAttributeNode(attr);
						}
						//Set value if a change event was previously triggered
						if(tmpValue)
						{
							focus.value = tmpValue;
							//Setup a one-time blur event handler to ensure
							//that a 'change' event is triggered
							$(focus).blur(function(e) {
								if(this.value !== oldValue)
									$(this).trigger('change');
								$(this).unbind(e);
							});
						}
						//Set focus and cursor
						focus.focus();
						if($(focus).is("input[type=text],input[type=password],textarea"))
						{
							focus.selectionStart = selectionStart;
							focus.selectionEnd = selectionEnd;
						}
					}
				}
				//Register event handlers
				for(var i in info.eventHandlers)
				{
					var events = info.eventHandlers[i].events.split(" "),
						elem = document.getElementById(i);
					for(var j = 0; j < events.length; j++)
						elem['on' + events[j]] = info.eventHandlers[i].handler;
					//Delete comment before element
					elem.parentNode.removeChild(elem.previousSibling);
				}
				if(cb) cb.call(el, null, html, info);
			}
			catch(e) {if(cb) cb.call(el, e);}
		}