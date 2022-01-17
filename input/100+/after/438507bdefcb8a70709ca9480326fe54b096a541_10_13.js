function() {
				$(this).find( '[rel]' ).each( function() {
					$(this).text( mediaWiki.msg( $(this).attr( 'rel' ) ) );
				});
				// Set tabindexes on form fields
				$.wikiEditor.modules.dialogs.fn.setTabindexes( $(this).find( 'input' ).not( '[tabindex]' ) );

				// TODO: Find a cleaner way to share this function
				$(this).data( 'replaceCallback', function( mode ) {
					$( '#wikieditor-toolbar-replace-nomatch, #wikieditor-toolbar-replace-success, #wikieditor-toolbar-replace-emptysearch, #wikieditor-toolbar-replace-invalidregex' ).hide();

					// Search string cannot be empty
					var searchStr = $( '#wikieditor-toolbar-replace-search' ).val();
					if ( searchStr == '' ) {
						$( '#wikieditor-toolbar-replace-emptysearch' ).show();
						return;
					}

					// Replace string can be empty
					var replaceStr = $( '#wikieditor-toolbar-replace-replace' ).val();

					// Prepare the regular expression flags
					var flags = 'm';
					var matchCase = $( '#wikieditor-toolbar-replace-case' ).is( ':checked' );
					if ( !matchCase ) {
						flags += 'i';
					}
					var isRegex = $( '#wikieditor-toolbar-replace-regex' ).is( ':checked' );
					if ( !isRegex ) {
						searchStr = $.escapeRE( searchStr );
					}
					if ( mode == 'replaceAll' ) {
						flags += 'g';
					}

					try {
						var regex = new RegExp( searchStr, flags );
					} catch( e ) {
						$( '#wikieditor-toolbar-replace-invalidregex' )
							.text( mediaWiki.msg( 'wikieditor-toolbar-tool-replace-invalidregex',
								e.message ) )
							.show();
						return;
					}

					var $textarea = $(this).data( 'context' ).$textarea;
					var text = $textarea.textSelection( 'getContents' );
					var match = false;
					var offset, textRemainder;
					if ( mode != 'replaceAll' ) {
						if (mode == 'replace') {
							offset = $(this).data( 'matchIndex' );
						} else {
							offset = $(this).data( 'offset' );
						}
						textRemainder = text.substr( offset );
						match = textRemainder.match( regex );
					}
					if ( !match ) {
						// Search hit BOTTOM, continuing at TOP
						// TODO: Add a "Wrap around" option.
						offset = 0;
						textRemainder = text;
						match = textRemainder.match( regex );
					}

					if ( !match ) {
						$( '#wikieditor-toolbar-replace-nomatch' ).show();
					} else if ( mode == 'replaceAll' ) {
						// Instead of using repetitive .match() calls, we use one .match() call with /g
						// and indexOf() followed by substr() to find the offsets. This is actually
						// faster because our indexOf+substr loop is faster than a match loop, and the
						// /g match is so ridiculously fast that it's negligible.
						// FIXME: Repetitively calling encapsulateSelection() is probably the best strategy
						// in Firefox/Webkit, but in IE replacing the entire content once is better.
						var index;
						for ( var i = 0; i < match.length; i++ ) {
							index = textRemainder.indexOf( match[i] );
							if ( index == -1 ) {
								// This shouldn't happen
								break;
							}
							var matchedText = textRemainder.substr( index, match[i].length );
							textRemainder = textRemainder.substr( index + match[i].length );

							var start = index + offset;
							var end = start + match[i].length;
							// Make regex placeholder substitution ($1) work
							var replace = isRegex ? matchedText.replace( regex, replaceStr ) : replaceStr;
							var newEnd = start + replace.length;
							$textarea
								.textSelection( 'setSelection', { 'start': start, 'end': end } )
								.textSelection( 'encapsulateSelection', {
										'peri': replace,
										'replace': true } )
								.textSelection( 'setSelection', { 'start': start, 'end': newEnd } );
							offset = newEnd;
						}
						$( '#wikieditor-toolbar-replace-success' )
							.text( mediaWiki.msg( 'wikieditor-toolbar-tool-replace-success', match.length ) )
							.show();
						$(this).data( 'offset', 0 );
					} else {
						var start, end;

						if ( mode == 'replace' ) {
							var actualReplacement;

							if (isRegex) {
								// If backreferences (like $1) are used, the actual actual replacement string will be different
								actualReplacement = match[0].replace( regex, replaceStr );
							} else {
								actualReplacement = replaceStr;
							}

							if (match) {
								// Do the replacement
								$textarea.textSelection( 'encapsulateSelection', {
										'peri': actualReplacement,
										'replace': true } );
								// Reload the text after replacement
								text = $textarea.textSelection( 'getContents' );
							}

							// Find the next instance
							offset = offset + match[0].length + actualReplacement.length;
							textRemainder = text.substr( offset );
							match = textRemainder.match( regex );

							if (match) {
								start = offset + match.index;
								end = start + match[0].length;
							} else {
								// If no new string was found, try searching from the beginning.
								// TODO: Add a "Wrap around" option.
								textRemainder = text;
								match = textRemainder.match( regex );
								if (match) {
									start = match.index;
									end = start + match[0].length;
								} else {
									// Give up
									start = 0;
									end = 0;
								}
							}
						} else {
							start = offset + match.index;
							end = start + match[0].length;
						}

						$( this ).data( 'matchIndex', start);

						$textarea.textSelection( 'setSelection', {
								'start': start,
								'end': end
						} );
						$textarea.textSelection( 'scrollToCaretPosition' );
						$( this ).data( 'offset', end );
						var context = $( this ).data( 'context' );
						var textbox = typeof context.$iframe != 'undefined' ?
								context.$iframe[0].contentWindow : $textarea[0];
						textbox.focus();
					}
				});
			}