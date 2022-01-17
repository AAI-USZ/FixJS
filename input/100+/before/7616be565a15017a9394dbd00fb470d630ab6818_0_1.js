function() {
	var lastClicked = false, checks, first, last, checked, menu = $('#adminmenu'),
		pageInput = $('input.current-page'), currentPage = pageInput.val(), refresh;

	// admin menu
	refresh = function(i, el){ // force the browser to refresh the tabbing index
		var node = $(el), tab = node.attr('tabindex');
		if ( tab )
			node.attr('tabindex', '0').attr('tabindex', tab);
	};

	$('#collapse-menu', menu).click(function(){
		var body = $(document.body);

		// reset any compensation for submenus near the bottom of the screen
		$('#adminmenu div.wp-submenu').css('margin-top', '');

		if ( body.hasClass('folded') ) {
			body.removeClass('folded');
			setUserSetting('mfold', 'o');
		} else {
			body.addClass('folded');
			setUserSetting('mfold', 'f');
		}
		return false;
	});

	$('li.wp-has-submenu', menu).hoverIntent({
		over: function(e){
			var b, h, o, f, m = $(this).find('.wp-submenu'), menutop, wintop, maxtop;

			if ( m.is(':visible') )
				return;

			menutop = $(this).offset().top;
			wintop = $(window).scrollTop();
			maxtop = menutop - wintop - 30; // max = make the top of the sub almost touch admin bar

			b = menutop + m.height() + 1; // Bottom offset of the menu
			h = $('#wpwrap').height(); // Height of the entire page
			o = 60 + b - h;
			f = $(window).height() + wintop - 15; // The fold

			if ( f < (b - o) )
				o = b - f;

			if ( o > maxtop )
				o = maxtop;

			if ( o > 1 )
				m.css('margin-top', '-'+o+'px');
			else
				m.css('margin-top', '');

			menu.find('.wp-submenu').removeClass('sub-open');
			m.addClass('sub-open');
		},
		out: function(){
			$(this).find('.wp-submenu').removeClass('sub-open').css('margin-top', '');
		},
		timeout: 200,
		sensitivity: 7,
		interval: 90
	});

	// Tab to select, Enter to open sub, Esc to close sub and focus the top menu
	$('li.wp-has-submenu > a.wp-not-current-submenu', menu).bind('keydown.adminmenu', function(e){
		if ( e.which != 13 )
			return;

		var target = $(e.target);

		e.stopPropagation();
		e.preventDefault();

		menu.find('.wp-submenu').removeClass('sub-open');
		target.siblings('.wp-submenu').toggleClass('sub-open').find('a[role="menuitem"]').each(refresh);
	}).each(refresh);

	$('a[role="menuitem"]', menu).bind('keydown.adminmenu', function(e){
		if ( e.which != 27 )
			return;

		var target = $(e.target);

		e.stopPropagation();
		e.preventDefault();

		target.add( target.siblings() ).closest('.sub-open').removeClass('sub-open').siblings('a.wp-not-current-submenu').focus();
	});

	// Move .updated and .error alert boxes. Don't move boxes designed to be inline.
	$('div.wrap h2:first').nextAll('div.updated, div.error').addClass('below-h2');
	$('div.updated, div.error').not('.below-h2, .inline').insertAfter( $('div.wrap h2:first') );

	// Init screen meta
	screenMeta.init();

	// check all checkboxes
	$('tbody').children().children('.check-column').find(':checkbox').click( function(e) {
		if ( 'undefined' == e.shiftKey ) { return true; }
		if ( e.shiftKey ) {
			if ( !lastClicked ) { return true; }
			checks = $( lastClicked ).closest( 'form' ).find( ':checkbox' );
			first = checks.index( lastClicked );
			last = checks.index( this );
			checked = $(this).prop('checked');
			if ( 0 < first && 0 < last && first != last ) {
				checks.slice( first, last ).prop( 'checked', function(){
					if ( $(this).closest('tr').is(':visible') )
						return checked;

					return false;
				});
			}
		}
		lastClicked = this;

		// toggle "check all" checkboxes
		var unchecked = $(this).closest('tbody').find(':checkbox').filter(':visible').not(':checked');
		$(this).closest('table').children('thead, tfoot').find(':checkbox').prop('checked', function() {
			return ( 0 == unchecked.length );
		});

		return true;
	});

	$('thead, tfoot').find('.check-column :checkbox').click( function(e) {
		var c = $(this).prop('checked'),
			kbtoggle = 'undefined' == typeof toggleWithKeyboard ? false : toggleWithKeyboard,
			toggle = e.shiftKey || kbtoggle;

		$(this).closest( 'table' ).children( 'tbody' ).filter(':visible')
		.children().children('.check-column').find(':checkbox')
		.prop('checked', function() {
			if ( $(this).closest('tr').is(':hidden') )
				return false;
			if ( toggle )
				return $(this).prop( 'checked' );
			else if (c)
				return true;
			return false;
		});

		$(this).closest('table').children('thead,  tfoot').filter(':visible')
		.children().children('.check-column').find(':checkbox')
		.prop('checked', function() {
			if ( toggle )
				return false;
			else if (c)
				return true;
			return false;
		});
	});

	$('#default-password-nag-no').click( function() {
		setUserSetting('default_password_nag', 'hide');
		$('div.default-password-nag').hide();
		return false;
	});

	// tab in textareas
	$('#newcontent').bind('keydown.wpevent_InsertTab', function(e) {
		if ( e.keyCode != 9 )
			return true;

		var el = e.target, selStart = el.selectionStart, selEnd = el.selectionEnd, val = el.value, scroll, sel;

		try {
			this.lastKey = 9; // not a standard DOM property, lastKey is to help stop Opera tab event. See blur handler below.
		} catch(err) {}

		if ( document.selection ) {
			el.focus();
			sel = document.selection.createRange();
			sel.text = '\t';
		} else if ( selStart >= 0 ) {
			scroll = this.scrollTop;
			el.value = val.substring(0, selStart).concat('\t', val.substring(selEnd) );
			el.selectionStart = el.selectionEnd = selStart + 1;
			this.scrollTop = scroll;
		}

		if ( e.stopPropagation )
			e.stopPropagation();
		if ( e.preventDefault )
			e.preventDefault();
	});

	$('#newcontent').bind('blur.wpevent_InsertTab', function(e) {
		if ( this.lastKey && 9 == this.lastKey )
			this.focus();
	});

	if ( pageInput.length ) {
		pageInput.closest('form').submit( function(e){

			// Reset paging var for new filters/searches but not for bulk actions. See #17685.
			if ( $('select[name="action"]').val() == -1 && $('select[name="action2"]').val() == -1 && pageInput.val() == currentPage )
				pageInput.val('1');
		});
	}

}