function(e) {
		var ed;

		if ( e.which != 9 )
			return;

		if ( !e.ctrlKey && !e.altKey && !e.shiftKey ) {
			if ( typeof(tinymce) != 'undefined' )
				ed = tinymce.get('content');

			if ( ed && !ed.isHidden() )
				$('#content_tbl td.mceToolbar > a').focus();
			else
				$('#content').focus();

			e.preventDefault();
		}
	}