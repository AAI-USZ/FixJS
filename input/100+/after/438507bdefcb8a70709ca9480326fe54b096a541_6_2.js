function ( query ) {
				var $el = $(this);
				if ( $el.children().length === 0 ) {
					$el.show();
					$( '<div>', {
							'class': 'special-label',
							text: mw.msg( 'vector-simplesearch-containing' )
						})
						.appendTo( $el );
					$( '<div>', {
							'class': 'special-query',
							text: query
						})
						.appendTo( $el )
						.autoEllipsis();
				} else {
					$el.find( '.special-query' )
						.empty()
						.text( query )
						.autoEllipsis();
				}
			}