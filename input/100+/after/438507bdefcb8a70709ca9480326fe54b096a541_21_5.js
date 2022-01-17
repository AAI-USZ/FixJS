function( context, id, page ) {
		var html;
		var $page = $( '<div/>' ).attr( {
			'class' : 'page page-' + id,
			'rel' : id
		} );
		switch ( page.layout ) {
			case 'table':
				$page.addClass( 'page-table' );
				html =
					'<table cellpadding=0 cellspacing=0 ' + 'border=0 width="100%" class="table table-' + id + '">';
				if ( 'headings' in page ) {
					html += $.wikiEditor.modules.toolbar.fn.buildHeading( context, page.headings );
				}
				if ( 'rows' in page ) {
					for ( var i = 0; i < page.rows.length; i++ ) {
						html += $.wikiEditor.modules.toolbar.fn.buildRow( context, page.rows[i] );
					}
				}
				$page.html( html + '</table>');
				break;
			case 'characters':
				$page.addClass( 'page-characters' );
				var $characters = $( '<div/>' ).data( 'context', context ).data( 'actions', {} );
				var actions = $characters.data( 'actions' );
				if ( 'language' in page ) {
					$characters.attr( 'lang', page.language );
				}
				if ( 'direction' in page ) {
					$characters.attr( 'dir', page.direction );
				} else {
					// By default it should be explicit ltr for all scripts.
					// Without this some conjoined ltr characters look
					// weird in rtl wikis.
					$characters.attr( 'dir', 'ltr' );
				}
				if ( 'characters' in page ) {
					html = '';
					for ( var i = 0; i < page.characters.length; i++ ) {
						html += $.wikiEditor.modules.toolbar.fn.buildCharacter( page.characters[i], actions );
					}
					$characters
						.html( html )
						.children()
						.mousedown( function( e ) {
							context.fn.saveCursorAndScrollTop();
							// No dragging!
							e.preventDefault();
							return false;
						} )
						.click( function( e ) {
							$.wikiEditor.modules.toolbar.fn.doAction(
								$(this).parent().data( 'context' ),
								$(this).parent().data( 'actions' )[$(this).attr( 'rel' )],
								$(this)
							);
							e.preventDefault();
							return false;
						} );
				}
				$page.append( $characters );
				break;
		}
		return $page;
	}