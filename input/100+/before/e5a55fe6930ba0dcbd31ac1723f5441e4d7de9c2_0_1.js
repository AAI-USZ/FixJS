function(){
				// initialize the object
				me.obj.addClass('aloha-editable')
					.contentEditable(true);

				// add focus event to the object to activate
				me.obj.mousedown(function(e) {
					// check whether the mousedown was already handled
					if (!Aloha.eventHandled) {
						Aloha.eventHandled = true;
						return me.activate(e);
					}
				});

				me.obj.mouseup(function(e) {
					Aloha.eventHandled = false;
				});

				me.obj.focus(function(e) {
					return me.activate(e);
				});

				// by catching the keydown we can prevent the browser from doing its own thing
				// if it does not handle the keyStroke it returns true and therefore all other
				// events (incl. browser's) continue
				me.obj.keydown(function(event) {
					me.keyCode = event.which;
					return Markup.preProcessKeyStrokes(event);
				});

				// handle keypress
				me.obj.keypress( function(event) {
					// triggers a smartContentChange to get the right charcode
					// To test try http://www.w3.org/2002/09/tests/keys.html
					Aloha.activeEditable.smartContentChange(event);
				});

				// handle shortcut keys
				me.obj.keyup(function(event) {
					if (event.keyCode === 27 ) {
						Aloha.deactivateEditable();
						return false;
					}
				});

				// register the onSelectionChange Event with the Editable field
				me.obj.contentEditableSelectionChange(function (event) {
					Selection.onChange(me.obj, event);
					return me.obj;
				});

				// mark the editable as unmodified
				me.setUnmodified();

				// apply content handler to clean up content
				var content = me.obj.html();
				if ( typeof Aloha.settings.contentHandler.initEditable === 'undefined') {
					Aloha.settings.contentHandler.initEditable = Aloha.defaults.contentHandler.initEditable;
				}
				content = ContentHandlerManager.handleContent( content, {
					contenthandler: Aloha.settings.contentHandler.initEditable 
				});
				me.obj.html( content );

				me.snapshotContent = me.getContents();

				// FF bug: check for empty editable contents (no <br>; no whitespace)
				if (jQuery.browser.mozilla) {
					me.initEmptyEditable();
				}

				// init placeholder
				me.initPlaceholder();

				// now the editable is ready
				me.ready = true;
				// throw a new event when the editable has been created
				/**
				 * @event editableCreated fires after a new editable has been created, eg. via $('#editme').aloha()
				 * The event is triggered in Aloha's global scope Aloha
				 * @param {Event} e the event object
				 * @param {Array} a an array which contains a reference to the currently created editable on its first position
				 */
				Aloha.trigger('aloha-editable-created',[me]);
			}