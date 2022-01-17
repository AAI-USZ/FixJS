function( context, id, tool ) {
		if ( 'filters' in tool ) {
			for ( var i = 0; i < tool.filters.length; i++ ) {
				if ( $( tool.filters[i] ).size() === 0 ) {
					return null;
				}
			}
		}
		var label = $.wikiEditor.autoMsg( tool, 'label' );
		switch ( tool.type ) {
			case 'button':
				var src = $.wikiEditor.autoIcon( tool.icon, $.wikiEditor.imgPath + 'toolbar/' );
				var $button = null;
				if ( 'offset' in tool ) {
					var offsetOrIcon = $.wikiEditor.autoIconOrOffset( tool.icon, tool.offset,
						$.wikiEditor.imgPath + 'toolbar/'
					);
					if ( typeof offsetOrIcon == 'object' ) {
						$button = $( '<a/>' )
							.attr( {
								'href' : '#',
								'alt' : label,
								'title' : label,
								'rel' : id,
								'class' : 'tool tool-button wikiEditor-toolbar-spritedButton'
							} )
							.text( label )
							.css( 'backgroundPosition', offsetOrIcon[0] + 'px ' + offsetOrIcon[1] + 'px' );
					}
				}
				if ( !$button ) {
					$button = $( '<img/>' )
						.attr( {
							'src' : src,
							'width' : 22,
							'height' : 22,
							'alt' : label,
							'title' : label,
							'rel' : id,
							'class' : 'tool tool-button'
						} );
				}
				if ( 'action' in tool ) {
					$button
						.data( 'action', tool.action )
						.data( 'context', context )
						.mousedown( function( e ) {
							context.fn.saveCursorAndScrollTop();
							// No dragging!
							e.preventDefault();
							return false;
						} )
						.click( function( e ) {
							$.wikiEditor.modules.toolbar.fn.doAction(
								$(this).data( 'context' ), $(this).data( 'action' ), $(this)
							);
							e.preventDefault();
							return false;
						} );
				}
				return $button;
			case 'select':
				var $select = $( '<div/>' )
					.attr( { 'rel' : id, 'class' : 'tool tool-select' } );
				var $options = $( '<div/>' ).addClass( 'options' );
				if ( 'list' in tool ) {
					for ( var option in tool.list ) {
						var optionLabel = $.wikiEditor.autoMsg( tool.list[option], 'label' );
						$options.append(
							$( '<a/>' )
								.data( 'action', tool.list[option].action )
								.data( 'context', context )
								.mousedown( function( e ) {
									context.fn.saveCursorAndScrollTop();
									// No dragging!
									e.preventDefault();
									return false;
								} )
								.click( function( e ) {
									$.wikiEditor.modules.toolbar.fn.doAction(
										$(this).data( 'context' ), $(this).data( 'action' ), $(this)
									);
									// Hide the dropdown
									// Sanity check: if this somehow gets called while the dropdown
									// is hidden, don't show it
									if ( $(this).parent().is( ':visible' ) ) {
										$(this).parent().animate( { 'opacity': 'toggle' }, 'fast' );
									}
									e.preventDefault();
									return false;
								} )
								.text( optionLabel )
								.addClass( 'option' )
								.attr( { 'rel': option, 'href': '#' } )
						);
					}
				}
				$select.append( $( '<div/>' ).addClass( 'menu' ).append( $options ) );
				$select.append( $( '<a/>' )
						.addClass( 'label' )
						.text( label )
						.data( 'options', $options )
						.attr( 'href', '#' )
						.mousedown( function( e ) {
							// No dragging!
							e.preventDefault();
							return false;
						} )
						.click( function( e ) {
							$(this).data( 'options' ).animate( { 'opacity': 'toggle' }, 'fast' );
							e.preventDefault();
							return false;
						} )
				);
				return $select;
			default:
				return null;
		}
	}