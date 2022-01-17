function( e, s ) {
		e = $(e);
		s = s || {};
		var list = this, cls = wpList.parseClass(e,'add'), es, valid, formData, res, rres;

		s = wpList.pre.call( list, e, s, 'add' );

		s.element = cls[2] || e.attr( 'id' ) || s.element || null;

		if ( cls[3] )
			s.addColor = '#' + cls[3];
		else
			s.addColor = s.addColor || '#FFFF33';

		if ( !s )
			return false;

		if ( !e.is('[id="' + s.what + '-add-submit"]') )
			return !wpList.add.call( list, e, s );

		if ( !s.element )
			return true;

		s.action = 'add-' + s.what;

		s.nonce = wpList.nonce(e,s);

		es = $('#' + s.element + ' :input').not('[name="_ajax_nonce"], [name="_wpnonce"], [name="action"]');
		valid = wpAjax.validateForm( '#' + s.element );

		if ( !valid )
			return false;

		s.data = $.param( $.extend( { _ajax_nonce: s.nonce, action: s.action }, wpAjax.unserialize( cls[4] || '' ) ) );
		formData = $.isFunction(es.fieldSerialize) ? es.fieldSerialize() : es.serialize();

		if ( formData )
			s.data += '&' + formData;

		if ( $.isFunction(s.addBefore) ) {
			s = s.addBefore( s );
			if ( !s )
				return true;
		}

		if ( !s.data.match(/_ajax_nonce=[a-f0-9]+/) )
			return true;

		s.success = function(r) {
			res = wpAjax.parseAjaxResponse(r, s.response, s.element);

			rres = r;

			if ( !res || res.errors )
				return false;

			if ( true === res )
				return true;

			jQuery.each( res.responses, function() {
				wpList.add.call( list, this.data, $.extend( {}, s, { // this.firstChild.nodevalue
					pos: this.position || 0,
					id: this.id || 0,
					oldId: this.oldId || null
				} ) );
			} );

			list.wpList.recolor();
			$(list).trigger( 'wpListAddEnd', [ s, list.wpList ] );
			wpList.clear.call(list,'#' + s.element);
		};

		s.complete = function(x, st) {
			if ( $.isFunction(s.addAfter) ) {
				var _s = $.extend( { xml: x, status: st, parsed: res }, s );
				s.addAfter( rres, _s );
			}
		};

		$.ajax( s );
		return false;
	}