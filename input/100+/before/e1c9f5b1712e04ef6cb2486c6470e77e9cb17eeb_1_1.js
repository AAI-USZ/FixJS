f			var me = this;

			// TODO make editables their own settings.
			this.settings = Aloha.settings;

			// smartContentChange settings
			// @TODO move to new config when implemented in Aloha
			if ( Aloha.settings && Aloha.settings.smartContentChange ) {
				if ( Aloha.settings.smartContentChange.delimiters ) {
					this.sccDelimiters = Aloha.settings.smartContentChange.delimiters;
				}

				if ( Aloha.settings.smartContentChange.idle ) {
					this.sccIdle = Aloha.settings.smartContentChange.idle;
				}

				if ( Aloha.settings.smartContentChange.delay ) {
					this.sccDelay = Aloha.settings.smartContentChange.delay;
				}
			}

			// check if Aloha can handle the obj as Editable
			if ( !this.check( this.obj ) ) {
				//Aloha.log( 'warn', this, 'Aloha cannot handle {' + this.obj[0].nodeName + '}' );
				this.destroy();
				return;
			}

			// apply content handler to clean up content
			if ( typeof Aloha.settings.contentHandler.initEditable === 'undefined' ) {
				Aloha.settings.contentHandler.initEditable = Aloha.defaults.contentHandler.initEditable;
			}
			
			var content = me.obj.html();
			content = ContentHandlerManager.handleContent( content, {
				contenthandler: Aloha.settings.contentHandler.initEditable
			} );
			me.obj.html( content );

			// only initialize the editable when Aloha is fully ready (including plugins)
			Aloha.bind( 'aloha-ready', function() {
				// initialize the object
				me.obj.addClass( 'aloha-editable' ).contentEditable( true );

				// add focus event to the object to activate
				me.obj.mousedown( function( e ) {
					// check whether the mousedown was already handled
					if ( !Aloha.eventHandled ) {
						Aloha.eventHandled = true;
						return me.activate( e );
					}
				} );

				me.obj.mouseup( function( e ) {
					Aloha.eventHandled = false;
				} );

				me.obj.focus( function( e ) {
					return me.activate( e );
				} );

				// by catching the keydown we can prevent the browser from doing its own thing
				// if it does not handle the keyStroke it returns true and therefore all other
				// events (incl. browser's) continue
				//me.obj.keydown( function( event ) {
				//me.obj.add('.aloha-block', me.obj).live('keydown', function (event) { // live not working but would be usefull
				me.obj.add('.aloha-block', me.obj).keydown(function (event) {
					var letEventPass = Markup.preProcessKeyStrokes( event );
					me.keyCode = event.which;

					if (!letEventPass) {
						// the event will not proceed to key press, therefore trigger smartContentChange
						me.smartContentChange( event );
					}
					return letEventPass;
				} );

				// handle keypress
				me.obj.keypress( function( event ) {
					// triggers a smartContentChange to get the right charcode
					// To test try http://www.w3.org/2002/09/tests/keys.html
					Aloha.activeEditable.smartContentChange( event );
				} );

				// handle shortcut keys
				me.obj.keyup( function( event ) {
					if ( event.keyCode === 27 ) {
						Aloha.deactivateEditable();
						return false;
					}
				} );

				// register the onSelectionChange Event with the Editable field
				me.obj.contentEditableSelectionChange( function( event ) {
					Selection.onChange( me.obj, event );
					return me.obj;
				} );

				// mark the editable as unmodified
				me.setUnmodified();

				// we don't do the sanitizing on aloha ready, since some plugins add elements into the content and bind events to it.
				// if we sanitize by replacing the html, all events would get lost. TODO: think about a better solution for the sanitizing, without
				// destroying the events
//				// apply content handler to clean up content
//				var content = me.obj.html();
//				if ( typeof Aloha.settings.contentHandler.initEditable === 'undefined' ) {
//					Aloha.settings.contentHandler.initEditable = Aloha.defaults.contentHandler.initEditable;
//				}
//				content = ContentHandlerManager.handleContent( content, {
//					contenthandler: Aloha.settings.contentHandler.initEditable
//				} );
//				me.obj.html( content );

				me.snapshotContent = me.getContents();

				// FF bug: check for empty editable contents ( no <br>; no whitespace )
				if ( jQuery.browser.mozilla ) {
					me.initEmptyEditable();
				}

				me.initPlaceholder();

				me.ready = true;

				// throw a new event when the editable has been created
				/**
				 * @event editableCreated fires after a new editable has been created, eg. via $( '#editme' ).aloha()
				 * The event is triggered in Aloha's global scope Aloha
				 * @param {Event} e the event object
				 * @param {Array} a an array which contains a reference to the currently created editable on its first position
				 */
				Aloha.trigger( 'aloha-editable-created', [ me ] );
			} );
		},
