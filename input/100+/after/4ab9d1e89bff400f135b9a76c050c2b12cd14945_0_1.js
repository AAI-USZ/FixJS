function(){
		var mce = typeof(tinymce) != 'undefined' ? tinymce.activeEditor : false, title, content;

		if ( mce && !mce.isHidden() ) {
			if ( mce.isDirty() )
				return autosaveL10n.saveAlert;
		} else {
			if ( fullscreen && fullscreen.settings.visible ) {
				title = $('#wp-fullscreen-title').val();
				content = $("#wp_mce_fullscreen").val();
			} else {
				title = $('#post #title').val();
				content = $('#post #content').val();
			}

			if ( ( title || content ) && title + content != autosaveLast )
				return autosaveL10n.saveAlert;
		}
	}