function ( data ) {
			var talks = data[ 'talks' ];

			console.log( talks );

			if ( sort_talks_list_by != undefined ) {
				if ( sort_talks_list_by == 'a' ) {
					talks.sort( function ( a, b ) {
						var topic_a = a[ 'Talk' ][ 'topic' ].toLowerCase();
						var topic_b = b[ 'Talk' ][ 'topic' ].toLowerCase();

						if ( topic_a < topic_b ) {
							return -1;
						} else {
							if ( topic_a > topic_b ) {
								return 1;
							} else {
								return 0;
							}
						}
					} );
				} else if ( sort_talks_list_by == 'l' ) {
					
				} else if ( sort_talks_list_by == 's' ) {

				}
			} else if ( sort_talks_list_by == undefined ) {
				talks.sort( function ( a, b ) {
					var topic_a = a[ 'Talk' ][ 'topic' ].toLowerCase();
					var topic_b = b[ 'Talk' ][ 'topic' ].toLowerCase();

					if ( topic_a < topic_b ) {
						return -1;
					} else {
						if ( topic_a > topic_b ) {
							return 1;
						} else {
							return 0;
						}
					}
				} );
			}

			$( 'ul#talks-list' ).empty();
			for ( i = 0; i < talks.length; i++ ) {

				$( 'ul#talks-list' ).append(
					'<li>' +
						'<a href="#">' +
							'<img class="talks-list-image" src="http://www.gravatar.com/avatar/' + hex_md5( talks[ i ][ 'Speaker' ][ 'email' ] ) + '" />' +
							'<h3>' + talks[ i ][ 'Talk' ][ 'topic' ] + '</h3>' +
							'<p>' + talks[ i ][ 'Talk' ][ 'abstract' ].replace( /(<([^>]+)>)/ig, "" ) + '</p>' +
							'<span class="ui-li-count">' + talks[ i ][ 'Talk' ][ 'talk_like_count' ] + ' ♥</span>' +
						'</a>' +
					'</li>'
				).listview( 'refresh' );
			}
		}