function( event ) {
				$(this).parent().parent().find( '.page' ).hide();
				$(this).parent().parent().find( '.page-' + $(this).attr( 'rel' ) ).show();
				$(this).siblings().removeClass( 'current' );
				$(this).addClass( 'current' );
				var section = $(this).parent().parent().attr( 'rel' );
				$.cookie(
					'wikiEditor-' + $(this).data( 'context' ).instance + '-booklet-' + section + '-page',
					$(this).attr( 'rel' ),
					{ expires: 30, path: '/' }
				);
				// Click tracking
				if ( mw.config.get( 'wgWikiEditorToolbarClickTracking' ) && $.trackAction !== undefined ) {
					$.trackAction(section + '.' + $(this).attr('rel'));
				}
				context.fn.restoreCursorAndScrollTop();
				// No dragging!
				event.preventDefault();
				return false;
			}