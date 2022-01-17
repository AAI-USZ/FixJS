function( mode ) {
					$( '#wikieditor-toolbar-replace-nomatch, #wikieditor-toolbar-replace-success, #wikieditor-toolbar-replace-emptysearch, #wikieditor-toolbar-replace-invalidregex' ).hide();
					var searchStr = $( '#wikieditor-toolbar-replace-search' ).val();
					if ( searchStr == '' ) {
						$( '#wikieditor-toolbar-replace-emptysearch' ).show();
						return;
					}
					var replaceStr = $( '#wikieditor-toolbar-replace-replace' ).val();
					var flags = 'm';
					var matchCase = $( '#wikieditor-toolbar-replace-case' ).is( ':checked' );
					var isRegex = $( '#wikieditor-toolbar-replace-regex' ).is( ':checked' );
					if ( !matchCase ) {
						flags += 'i';
					}
					if ( mode == 'replaceAll' ) {
						flags += 'g';
					}
					if ( !isRegex ) {
						searchStr = $.escapeRE( searchStr );
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
					var offset, s;
					if ( mode != 'replaceAll' ) {
						offset = $(this).data( 'offset' );
						s = text.substr( offset );
						match = s.match( regex );
					}
					if ( !match ) {
						// Search hit BOTTOM, continuing at TOP
						offset = 0;
						s = text;
						match = s.match( regex );
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
							index = s.indexOf( match[i] );
							if ( index == -1 ) {
								// This shouldn't happen
								break;
							}
							var matchedText = s.substr( index, match[i].length );
							s = s.substr( index + match[i].length );
							
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
						// Make regex placeholder substitution ($1) work
						var replace = isRegex ? match[0].replace( regex, replaceStr ): replaceStr;
						var start = match.index + offset;
						var end = start + match[0].length;
						var newEnd = start + replace.length;
						var context = $( this ).data( 'context' );
						$textarea.textSelection( 'setSelection', { 'start': start,
							'end': end } );
						if ( mode == 'replace' ) {
							$textarea
								.textSelection( 'encapsulateSelection', {
									'peri': replace,
									'replace': true } )
								.textSelection( 'setSelection', {
									'start': start,
									'end': newEnd } );
						}
						$textarea.textSelection( 'scrollToCaretPosition' );
						$textarea.textSelection( 'setSelection', { 'start': start,
							'end': mode == 'replace' ? newEnd : end } );
						$( this ).data( 'offset', mode == 'replace' ? newEnd : end );
						var textbox = typeof context.$iframe != 'undefined' ?
								context.$iframe[0].contentWindow : $textarea[0];
						textbox.focus();
					}
				}