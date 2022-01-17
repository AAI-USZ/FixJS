function( query ) {
				if ( $(this).children().length === 0 ) {
					$(this).show();
					var $label = $( '<div></div>', {
							'class': 'special-label',
							text: mw.msg( 'vector-simplesearch-containing' )
						})
						.appendTo( $(this) );
					var $query = $( '<div></div>', {
							'class': 'special-query',
							text: query
						})
						.appendTo( $(this) );
					$query.autoEllipsis();
				} else {
					$(this).find( '.special-query' )
						.empty()
						.text( query )
						.autoEllipsis();
				}
			}