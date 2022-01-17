function ( query ) {
				var $el = $(this);
				if ( query.length !== 0 ) {
					var jqXhr = $.ajax( {
						url: mw.util.wikiScript( 'api' ),
						data: {
							format: 'json',
							action: 'opensearch',
							search: query,
							namespace: 0,
							suggest: ''
						},
						dataType: 'json',
						success: function ( data ) {
							if ( $.isArray( data ) && data.length ) {
								$el.suggestions( 'suggestions', data[1] );
							}
						}
					});
					$el.data( 'request', jqXhr );
				}
			}