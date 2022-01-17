function( e ) {
					var $sections = $(this).data( 'context' ).$ui.find( '.sections' );
					var $section =
						$(this).data( 'context' ).$ui.find( '.section-' + $(this).parent().attr( 'rel' ) );
					var show = $section.css( 'display' ) == 'none';
					var $previousSections = $section.parent().find( '.section-visible' );
					$previousSections.css( 'position', 'absolute' );
					$previousSections.removeClass( 'section-visible' );
					$previousSections.fadeOut( 'fast', function() { $(this).css( 'position', 'static' ); } );
					$(this).parent().parent().find( 'a' ).removeClass( 'current' );
					$sections.css( 'overflow', 'hidden' );
					var animate = function( $that ) {
						$sections
						.css( 'display', 'block' )
						.animate( { 'height': $section.outerHeight() }, $section.outerHeight() * 2, function() {
							$that.css( 'overflow', 'visible' ).css( 'height', 'auto' );
							context.fn.trigger( 'resize' );
						} );
					};
					if ( show ) {
						$section.addClass( 'section-visible' );
						$section.fadeIn( 'fast' );
						if ( $section.hasClass( 'loading' ) ) {
							// Loading of this section was deferred, load it now
							var $that = $(this);
							$that.addClass( 'current loading' );
							setTimeout( function() {
								$section.trigger( 'loadSection' );
								animate( $that );
								$that.removeClass( 'loading' );
							}, 1000 );
						} else {
							animate( $(this) );
							$(this).addClass( 'current' );
						}
					} else {
						$sections
							.css( 'height', $section.outerHeight() )
							.animate( { 'height': 'hide' }, $section.outerHeight() * 2, function() {
								$(this).css( { 'overflow': 'visible', 'height': 0 } );
								context.fn.trigger( 'resize' );
							} );
					}
					// Click tracking
					if ( mw.config.get( 'wgWikiEditorToolbarClickTracking' ) && $.trackAction !== undefined ) {
						$.trackAction( $section.attr('rel') + '.' + ( show ? 'show': 'hide' )  );
					}
					// Save the currently visible section
					$.cookie(
						'wikiEditor-' + $(this).data( 'context' ).instance + '-toolbar-section',
						show ? $section.attr( 'rel' ) : null,
						{ expires: 30, path: '/' }
					);
					e.preventDefault();
					return false;
				}