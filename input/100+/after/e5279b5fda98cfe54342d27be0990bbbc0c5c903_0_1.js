function( options ) {
	options = $.extend( { 'prefix': '', 'keys': {}, 'params': {} }, options );
	function msg( key ) {
		var args = key in options.params ? options.params[key] : [];
		// Format: mw.msg( key [, p1, p2, ...] )
		args.unshift( options.prefix + ( key in options.keys ? options.keys[key] : key ) );
		return mw.msg.apply( mw, args );
	};
	return $(this)
		// Ok, so here's the story on this selector.
		// In IE 6/7, searching for 'msg' turns up the 'html:msg', but searching for 'html:msg' does not.
		// In later IE and other browsers, searching for 'html:msg' turns up the 'html:msg', but searching for 'msg' does not.
		// So searching for both 'msg' and 'html:msg' seems to get the job done.
		// This feels pretty icky, though.
		.find( 'msg,html\\:msg' )
			.each( function() {
				var $el = $(this);
				$el
					.text( msg( $el.attr( 'key' ) ) )
					.replaceWith( $el.html() );
			} )
			.end()
		.find( '[title-msg]' )
			.each( function() {
				var $el = $(this);
				$el
					.attr( 'title', msg( $el.attr( 'title-msg' ) ) )
					.removeAttr( 'title-msg' );
			} )
			.end()
		.find( '[alt-msg]' )
			.each( function() {
				var $el = $(this);
				$el
					.attr( 'alt', msg( $el.attr( 'alt-msg' ) ) )
					.removeAttr( 'alt-msg' );
			} )
			.end()
		.find( '[placeholder-msg]' )
			.each( function() {
				var $el = $(this);
				$el
					.attr( 'placeholder', msg( $el.attr( 'placeholder-msg' ) ) )
					.removeAttr( 'placeholder-msg' );
			} )
			.end()
		.find( '[data-localize-msg]' )
			.each( function() {
				var $el = $(this);
				$el
					.html( msg( $el.attr( 'data-localize-msg' ) ) );
			} )
			.end()
		.find( 'option[data-option-msg]' )
			.each( function() {
				var $el = $(this);
				$el
					.html( msg( $el.attr( 'data-option-msg' ) ) );
			} )
			.end();
}