function( context, action, source ) {
		// Verify that this has been called from a source that's within the toolbar
		// 'trackAction' defined in click tracking
		if ( mw.config.get( 'wgWikiEditorToolbarClickTracking' ) && $.trackAction !== undefined && source.closest( '.wikiEditor-ui-toolbar' ).size() ) {
			// Build a unique id for this action by tracking the parent rel attributes up to the toolbar level
			var rels = [];
			var step = source;
			var i = 0;
			while ( !step.hasClass( 'wikiEditor-ui-toolbar' ) ) {
				if ( i > 25 ) {
					break;
				}
				i++;
				var rel = step.attr( 'rel' );
				if ( rel ) {
					rels.push( step.attr( 'rel' ) );
				}
				step = step.parent();
			}
			rels.reverse();
			var id = rels.join( '.' );
			$.trackAction( id );
		}
		switch ( action.type ) {
			case 'replace':
			case 'encapsulate':
				var parts = {
					'pre' : $.wikiEditor.autoMsg( action.options, 'pre' ),
					'peri' : $.wikiEditor.autoMsg( action.options, 'peri' ),
					'post' : $.wikiEditor.autoMsg( action.options, 'post' )
				};
				var replace = action.type == 'replace';
				if ( 'regex' in action.options && 'regexReplace' in action.options ) {
					var selection = context.$textarea.textSelection( 'getSelection' );
					if ( selection !== '' && selection.match( action.options.regex ) ) {
						parts.peri = selection.replace( action.options.regex,
							action.options.regexReplace );
						parts.pre = parts.post = '';
						replace = true;
					}
				}
				context.$textarea.textSelection(
					'encapsulateSelection',
					$.extend( {}, action.options, parts, { 'replace': replace } )
				);
				if ( context.$iframe !== undefined ) {
					context.$iframe[0].contentWindow.focus();
				}
				break;
			case 'callback':
				if ( typeof action.execute == 'function' ) {
					action.execute( context );
				}
				break;
			case 'dialog':
				context.fn.saveSelection();
				context.$textarea.wikiEditor( 'openDialog', action.module );
				break;
			default: break;
		}
	}