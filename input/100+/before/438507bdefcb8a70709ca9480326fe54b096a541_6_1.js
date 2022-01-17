function( query ) {
				var $this = $(this);
				if ( query.length !== 0 ) {
					var request = $.ajax( {
						url: mw.util.wikiScript( 'api' ),
						data: {
							action: 'opensearch',
							search: query,
							namespace: 0,
							suggest: ''
						},
						dataType: 'json',
						success: function( data ) {
							if ( $.isArray( data ) && 1 in data ) {
								$this.suggestions( 'suggestions', data[1] );
							}
						}
					});
					$this.data( 'request', request );
				}
			}