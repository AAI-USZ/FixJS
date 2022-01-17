function( uid, link, note ) {
			this.citations[ this.getIndexOfCitation( uid ) ] = {
				uid  : uid,
				link : link,
				note : note
			};

			if ( link ) {
				// Update link attribute
				var el = jQuery( nsSel( uid ) ).attr( 'cite', link );

				if ( !animating ) {
					// Highlight animation for happy user.
					var round = Math.round;
					var from  = hex2rgb( '#fdff9a' );
					var to    = hex2rgb( '#fdff9a' );

					from.push( 1 );
					to.push( 0 );

					var diff = [ to[ 0 ] - from[ 0 ],
								 to[ 1 ] - from[ 1 ],
								 to[ 2 ] - from[ 2 ],
								 to[ 3 ] - from[ 3 ] ];

					var origBg = el[0].style.backgroundColor;
					var origShadow = el[0].style.boxShadow;

					el.css({
						__tick: 0, // Our increment.
						'background-color': 'rgba(' + from.join( ',' ) + ')',
						'box-shadow': '0 0 20px rgba(' + from.join( ',' ) + ')'
					});

					animating = true;

					el.animate( { __tick: 1 }, {
						duration: 500,
						easing: 'linear',
						step: function( val, fx ) {
							var rgba = [ round( from[ 0 ] + diff[ 0 ] * val ),
							             round( from[ 1 ] + diff[ 1 ] * val ),
							             round( from[ 2 ] + diff[ 2 ] * val ),
							             from[ 3 ] + diff[ 3 ] * val ];

							jQuery( this ).css({
								'background-color': 'rgba(' + rgba.join( ',' ) + ')',
								'box-shadow': '0 0 ' + ( 20 * ( 1 - val ) ) +
									'px rgba(' + from.join( ',' ) + ')'
							});
						},
						complete: function() {
							animating = false;
							this.style.backgroundColor = origBg;
							this.style.boxShadow = origShadow;
						}
					} );
				}
			}

			// Update information in references list for this citation.
			if ( this.referenceContainer ) {
				jQuery( 'li#cite-note-' + uid + ' span' ).html(
					supplant(
						link ? '<a class="external" target="_blank" href="{url}">{url}</a>' : '',
						{ url: link }
					) + ( note ? '. ' + note : '' )
				)
			}
		}