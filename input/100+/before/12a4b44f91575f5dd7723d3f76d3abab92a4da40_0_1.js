function( editor )

		{

			// On WebKit only, we need a special "filling" char on some situations

			// (#1272). Here we set the events that should invalidate that char.

			if ( CKEDITOR.env.webkit )

			{

				editor.on( 'selectionChange', function() { checkFillingChar( editor.document ); } );

				editor.on( 'beforeSetMode', function() { removeFillingChar( editor.document ); } );



				var fillingCharBefore,

					resetSelection;



				function beforeData()

				{

					var doc = editor.document,

						fillingChar = getFillingChar( doc );



					if ( fillingChar )

					{

						// If cursor is right blinking by side of the filler node, save it for restoring,

						// as the following text substitution will blind it. (#7437)

						var sel = doc.$.defaultView.getSelection();

						if ( sel.type == 'Caret' && sel.anchorNode == fillingChar.$ )

							resetSelection = 1;



						fillingCharBefore = fillingChar.getText();

						fillingChar.setText( fillingCharBefore.replace( /\u200B/g, '' ) );

					}

				}

				function afterData()

				{

					var doc = editor.document,

						fillingChar = getFillingChar( doc );



					if ( fillingChar )

					{

						fillingChar.setText( fillingCharBefore );



						if ( resetSelection )

						{

							doc.$.defaultView.getSelection().setPosition( fillingChar.$,fillingChar.getLength() );

							resetSelection = 0;

						}

					}

				}

				editor.on( 'beforeUndoImage', beforeData );

				editor.on( 'afterUndoImage', afterData );

				editor.on( 'beforeGetData', beforeData, null, null, 0 );

				editor.on( 'getData', afterData );

			}



			editor.on( 'contentDom', function()

				{

					var doc = editor.document,

						body = doc.getBody(),

						html = doc.getDocumentElement();



					if ( CKEDITOR.env.ie )

					{

						// Other browsers don't loose the selection if the

						// editor document loose the focus. In IE, we don't

						// have support for it, so we reproduce it here, other

						// than firing the selection change event.



						var savedBookmark,

							saveEnabled,

							restoreEnabled = 1;



						// "onfocusin" is fired before "onfocus". It makes it

						// possible to restore the selection before click

						// events get executed.

						body.on( 'focusin', function( evt )

							{

								// If there are elements with layout they fire this event but

								// it must be ignored to allow edit its contents #4682

								if ( evt.data.$.srcElement.nodeName != 'BODY' )

									return;



								// Give the priority to locked selection since it probably

								// reflects the actual situation. (#6083, #6987)

								var lockedSelection = doc.getCustomData( 'cke_locked_selection' );

								if ( lockedSelection )

								{

									lockedSelection.unlock( 1 );

									lockedSelection.lock();

								}

								// Then check ff we have saved a range, restore it at this

								// point.

								else if ( savedBookmark && restoreEnabled )

								{

									var range = doc.getSelection().getNative().createRange();

									range.moveToBookmark( savedBookmark );

									// Well not break because of this.

									try { range.select(); } catch (e) {}

									savedBookmark = null;

								}

							});



						body.on( 'focus', function()

							{

								// Enable selections to be saved.

								saveEnabled = 1;



								saveSelection();

							});



						body.on( 'beforedeactivate', function( evt )

							{

								// Ignore this event if it's caused by focus switch between

								// internal editable control type elements, e.g. layouted paragraph. (#4682)

								if ( evt.data.$.toElement )

									return;



								// Disable selections from being saved.

								saveEnabled = 0;

								restoreEnabled = 1;

							});



						// [IE] Iframe will still keep the selection when blurred, if

						// focus is moved onto a non-editing host, e.g. link or button, but

						// it becomes a problem for the object type selection, since the resizer

						// handler attached on it will mark other part of the UI, especially

						// for the dialog. (#8157)

						// [IE<8] Even worse For old IEs, the cursor will not vanish even if

						// the selection has been moved to another text input in some cases. (#4716)

						//

						// Now the range restore is disabled, so we simply force IE to clean

						// up the selection before blur.

						CKEDITOR.env.ie && editor.on( 'blur', function()

						{

							// Error proof when the editor is not visible. (#6375)

							try{ doc.$.selection.empty(); } catch ( er){}

						});



						// Listening on document element ensures that

						// scrollbar is included. (#5280)

						html.on( 'mousedown', function()

						{

							// Lock restore selection now, as we have

							// a followed 'click' event which introduce

							// new selection. (#5735)

							restoreEnabled = 0;

						});



						html.on( 'mouseup', function()

						{

							restoreEnabled = 1;

						});



						var scroll;

						// IE fires the "selectionchange" event when clicking

						// inside a selection. We don't want to capture that.

						body.on( 'mousedown', function( evt )

						{

							// IE scrolls document to top on right mousedown

							// when editor has no focus, remember this scroll

							// position and revert it before context menu opens. (#5778)

							if ( evt.data.$.button == 2 )

							{

								var sel = editor.document.$.selection;

								if ( sel.type == 'None' )

									scroll = editor.window.getScrollPosition();

							}

							disableSave();

						});



						body.on( 'mouseup',

							function( evt )

							{

								// Restore recorded scroll position when needed on right mouseup.

								if ( evt.data.$.button == 2 && scroll )

								{

									editor.document.$.documentElement.scrollLeft = scroll.x;

									editor.document.$.documentElement.scrollTop = scroll.y;

								}

								scroll = null;



								saveEnabled = 1;

								setTimeout( function()

									{

										saveSelection( true );

									},

									0 );

							});



						body.on( 'keydown', disableSave );

						body.on( 'keyup',

							function()

							{

								saveEnabled = 1;

								saveSelection();

							});



						// When content doc is in standards mode, IE doesn't focus the editor when

						// clicking at the region below body (on html element) content, we emulate

						// the normal behavior on old IEs. (#1659, #7932)

						if ( ( CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat )

							 && doc.$.compatMode != 'BackCompat' )

						{

							html.on( 'mousedown', function( evt )

							{

								function moveRangeToPoint( x, y )

								{

										// Error prune in IE7. (#9034, #9110)

										try { textRng.moveToPoint( x, y ); } catch ( e ) {}

								}



								// Expand the text range along with mouse move.

								function onHover( evt )

								{

									evt = evt.data.$;

									if ( textRng )

									{

										// Read the current cursor.

										var rngEnd = body.$.createTextRange();



										moveRangeToPoint( evt.x, evt.y );



										// Handle drag directions.

										textRng.setEndPoint(

											textRng.compareEndPoints( 'StartToStart', rngEnd ) < 0 ?

											'EndToEnd' :

											'StartToStart',

											rngEnd );



										// Update selection with new range.

										textRng.select();

									}

								}



								evt = evt.data.$;



								// We're sure that the click happens at the region

								// below body, but not on scrollbar.

								if ( evt.y < html.$.clientHeight

									 && evt.y > body.$.offsetTop + body.$.clientHeight

									 && evt.x < html.$.clientWidth )

								{

									// Start to build the text range.

									var textRng = body.$.createTextRange();

									moveRangeToPoint( evt.x, evt.y );



									html.on( 'mousemove', onHover );



									html.on( 'mouseup', function( evt )

									{

										html.removeListener( 'mousemove', onHover );

										evt.removeListener();



										// Make it in effect on mouse up. (#9022)

										textRng.select();

									} );

								}

							});

						}



						// It's much simpler for IE8, we just need to reselect the reported range.

						if ( CKEDITOR.env.ie8 )

						{

							html.on( 'mouseup', function( evt )

							{

								// The event is not fired when clicking on the scrollbars,

								// so we can safely check the following to understand

								// whether the empty space following <body> has been clicked.

								if ( evt.data.getTarget().getName() == 'html' )

								{

									var sel = CKEDITOR.document.$.selection,

										range = sel.createRange();

									// The selection range is reported on host, but actually it should applies to the content doc.

									if ( sel.type != 'None' && range.parentElement().ownerDocument == doc.$ )

										range.select();

								}

							} );

						}



						// IE is the only to provide the "selectionchange"

						// event.

						doc.on( 'selectionchange', saveSelection );



						function disableSave()

						{

							saveEnabled = 0;

						}



						function saveSelection( testIt )

						{

							if ( saveEnabled )

							{

								var doc = editor.document,

									sel = editor.getSelection(),

									nativeSel = sel && sel.getNative();



								// There is a very specific case, when clicking

								// inside a text selection. In that case, the

								// selection collapses at the clicking point,

								// but the selection object remains in an

								// unknown state, making createRange return a

								// range at the very start of the document. In

								// such situation we have to test the range, to

								// be sure it's valid.

								if ( testIt && nativeSel && nativeSel.type == 'None' )

								{

									// The "InsertImage" command can be used to

									// test whether the selection is good or not.

									// If not, it's enough to give some time to

									// IE to put things in order for us.

									if ( !doc.$.queryCommandEnabled( 'InsertImage' ) )

									{

										CKEDITOR.tools.setTimeout( saveSelection, 50, this, true );

										return;

									}

								}



								// Avoid saving selection from within text input. (#5747)

								var parentTag;

								if ( nativeSel && nativeSel.type && nativeSel.type != 'Control'

									&& ( parentTag = nativeSel.createRange() )

									&& ( parentTag = parentTag.parentElement() )

									&& ( parentTag = parentTag.nodeName )

									&& parentTag.toLowerCase() in { input: 1, textarea : 1 } )

								{

									return;

								}



								// Create an IE Range bookmark to defeat possible text node normalization.

								try { savedBookmark = nativeSel && nativeSel.createRange().getBookmark(); }

								catch(er){}



								checkSelectionChangeTimeout.call( editor );

							}

						}

					}

					else

					{

						// In other browsers, we make the selection change

						// check based on other events, like clicks or keys

						// press.



						doc.on( 'mouseup', checkSelectionChangeTimeout, editor );

						doc.on( 'keyup', checkSelectionChangeTimeout, editor );

						doc.on( 'selectionchange', checkSelectionChangeTimeout, editor );

					}



					if ( CKEDITOR.env.webkit )

					{

						doc.on( 'keydown', function( evt )

						{

							var key = evt.data.getKey();

							// Remove the filling char before some keys get

							// executed, so they'll not get blocked by it.

							switch ( key )

							{

								case 13 :	// ENTER

								case 33 :	// PAGEUP

								case 34 :	// PAGEDOWN

								case 35 :	// HOME

								case 36 :	// END

								case 37 :	// LEFT-ARROW

								case 39 :	// RIGHT-ARROW

								case 8 :	// BACKSPACE

								case 45 :	// INS

								case 46 :	// DEl

									removeFillingChar( editor.document );

							}



						}, null, null, 10 );

					}

				});



			// Clear the cached range path before unload. (#7174)

			editor.on( 'contentDomUnload', editor.forceNextSelectionCheck, editor );



			editor.addCommand( 'selectAll', selectAllCmd );

			editor.ui.addButton( 'SelectAll',

				{

					label : editor.lang.selectAll,

					command : 'selectAll'

				});



			/**

			 * Check if to fire the {@link CKEDITOR.editor#selectionChange} event

			 * for the current editor instance.

			 *

			 * @param {Boolean} checkNow Check immediately without any delay.

			 */

			editor.selectionChange = function( checkNow )

			{

				( checkNow ? checkSelectionChange : checkSelectionChangeTimeout ).call( this );

			};



			// IE9 might cease to work if there's an object selection inside the iframe (#7639).

			CKEDITOR.env.ie9Compat && editor.on( 'destroy', function()

			{

				var sel = editor.getSelection();

				sel && sel.getNative().clear();

			}, null, null, 9 );

		}