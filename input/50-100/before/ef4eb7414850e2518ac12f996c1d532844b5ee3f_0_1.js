function(e) {
			if ( e.which != 9 )
				return;

			if ( !e.ctrlKey && !e.altKey && !e.shiftKey && tinymce.activeEditor && !tinymce.activeEditor.isHidden() ) {
				$('td.mceToolbar > a').focus();
				e.preventDefault();
			}
		}