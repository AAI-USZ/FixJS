function( context, id, section ) {
		var selected = $.cookie( 'wikiEditor-' + context.instance + '-toolbar-section' );
		// Re-save cookie
		if ( selected !== null ) {
			$.cookie( 'wikiEditor-' + context.instance + '-toolbar-section', selected, { expires: 30, path: '/' } );
		}
		var $link = 
			$( '<a/>' )
				.addClass( selected == id ? 'current' : null )
				.attr( 'href', '#' )
				.text( $.wikiEditor.autoMsg( section, 'label' ) )
				.data( 'context', context )
				.mouseup( function( e ) {
					$(this).blur();
				} )
				.mousedown( function( e ) {
					// No dragging!
					e.preventDefault();
					return false;
				} )
				.click( function( e ) {
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
					if ( $.trackAction !== undefined ) {
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
				});
		return $( '<span/>' )
			.attr({
				'class' : 'tab tab-' + id,
				'rel' : id
			})
			.append( $link );
	}