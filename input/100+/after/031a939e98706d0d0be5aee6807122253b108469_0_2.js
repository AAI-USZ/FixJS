function($) {

	autosaveLast = $('#post #title').val() + $('#post #content').val();
	autosavePeriodical = $.schedule({time: autosaveL10n.autosaveInterval * 1000, func: function() { autosave(); }, repeat: true, protect: true});

	//Disable autosave after the form has been submitted
	$("#post").submit(function() {
		$.cancel(autosavePeriodical);
		autosaveLockRelease = false;
	});

	$('input[type="submit"], a.submitdelete', '#submitpost').click(function(){
		blockSave = true;
		window.onbeforeunload = null;
		$(':button, :submit', '#submitpost').each(function(){
			var t = $(this);
			if ( t.hasClass('button-primary') )
				t.addClass('button-primary-disabled');
			else
				t.addClass('button-disabled');
		});
		if ( $(this).attr('id') == 'publish' )
			$('#ajax-loading').css('visibility', 'visible');
		else
			$('#draft-ajax-loading').css('visibility', 'visible');
	});

	window.onbeforeunload = function(){
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
	};

	$(window).unload( function(e) {
		if ( ! autosaveLockRelease )
			return;

		// unload fires (twice) on removing the Thickbox iframe. Make sure we process only the main document unload.
		if ( e.target && e.target.nodeName != '#document' )
			return;

		$.ajax({
			type: 'POST',
			url: ajaxurl,
			async: false,
			data: {
				action: 'wp-remove-post-lock',
				_wpnonce: $('#_wpnonce').val(),
				post_ID: $('#post_ID').val(),
				active_post_lock: $('#active_post_lock').val()
			}
		});
	} );

	// preview
	$('#post-preview').click(function(){
		if ( $('#auto_draft').val() == '1' && notSaved ) {
			autosaveDelayPreview = true;
			autosave();
			return false;
		}
		doPreview();
		return false;
	});

	doPreview = function() {
		$('input#wp-preview').val('dopreview');
		$('form#post').attr('target', 'wp-preview').submit().attr('target', '');

		/*
		 * Workaround for WebKit bug preventing a form submitting twice to the same action.
		 * https://bugs.webkit.org/show_bug.cgi?id=28633
		 */
		if ( $.browser.safari ) {
			$('form#post').attr('action', function(index, value) {
				return value + '?t=' + new Date().getTime();
			});
		}

		$('input#wp-preview').val('');
	}

	//  This code is meant to allow tabbing from Title to Post if tinymce is defined.
	if ( typeof tinymce != 'undefined' ) {
		$('#title').bind('keydown.focus-tinymce', function(e) {
			if ( e.which != 9 )
				return;

			if ( !e.ctrlKey && !e.altKey && !e.shiftKey && tinymce.activeEditor && !tinymce.activeEditor.isHidden() ) {
				$('td.mceToolbar > a').focus();
				e.preventDefault();
			}
		});
	}

	// autosave new posts after a title is typed but not if Publish or Save Draft is clicked
	if ( '1' == $('#auto_draft').val() ) {
		$('#title').blur( function() {
			if ( !this.value || $('#auto_draft').val() != '1' )
				return;
			delayed_autosave();
		});
	}
}