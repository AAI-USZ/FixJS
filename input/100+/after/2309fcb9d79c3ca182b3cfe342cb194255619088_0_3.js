function() {
	// (bool) is rich editor enabled and active
	blockSave = true;
	var rich = (typeof tinymce != "undefined") && tinymce.activeEditor && !tinymce.activeEditor.isHidden(),
		post_data, doAutoSave, ed, origStatus, successCallback;

	autosave_disable_buttons();

	post_data = {
		action: "autosave",
		post_ID:  jQuery("#post_ID").val() || 0,
		autosavenonce: jQuery('#autosavenonce').val(),
		post_type: jQuery('#post_type').val() || "",
		autosave: 1
	};

	jQuery('.tags-input').each( function() {
		post_data[this.name] = this.value;
	} );

	// We always send the ajax request in order to keep the post lock fresh.
	// This (bool) tells whether or not to write the post to the DB during the ajax request.
	doAutoSave = true;

	// No autosave while thickbox is open (media buttons)
	if ( jQuery("#TB_window").css('display') == 'block' )
		doAutoSave = false;

	/* Gotta do this up here so we can check the length when tinymce is in use */
	if ( rich && doAutoSave ) {
		ed = tinymce.activeEditor;
		// Don't run while the tinymce spellcheck is on. It resets all found words.
		if ( ed.plugins.spellchecker && ed.plugins.spellchecker.active ) {
			doAutoSave = false;
		} else {
			if ( 'mce_fullscreen' == ed.id || 'wp_mce_fullscreen' == ed.id )
				tinymce.get('content').setContent(ed.getContent({format : 'raw'}), {format : 'raw'});
			tinymce.triggerSave();
		}
	}

	if ( fullscreen && fullscreen.settings.visible ) {
		post_data["post_title"] = jQuery('#wp-fullscreen-title').val() || '';
		post_data["content"] = jQuery("#wp_mce_fullscreen").val() || '';
	} else {
		post_data["post_title"] = jQuery("#title").val() || '';
		post_data["content"] = jQuery("#content").val() || '';
	}

	if ( jQuery('#post_name').val() )
		post_data["post_name"] = jQuery('#post_name').val();

	// Nothing to save or no change.
	if ( ( post_data["post_title"].length == 0 && post_data["content"].length == 0 ) || post_data["post_title"] + post_data["content"] == autosaveLast ) {
		doAutoSave = false;
	}

	origStatus = jQuery('#original_post_status').val();

	goodcats = ([]);
	jQuery("[name='post_category[]']:checked").each( function(i) {
		goodcats.push(this.value);
	} );
	post_data["catslist"] = goodcats.join(",");

	if ( jQuery("#comment_status").prop("checked") )
		post_data["comment_status"] = 'open';
	if ( jQuery("#ping_status").prop("checked") )
		post_data["ping_status"] = 'open';
	if ( jQuery("#excerpt").size() )
		post_data["excerpt"] = jQuery("#excerpt").val();
	if ( jQuery("#post_author").size() )
		post_data["post_author"] = jQuery("#post_author").val();
	if ( jQuery("#parent_id").val() )
		post_data["parent_id"] = jQuery("#parent_id").val();
	post_data["user_ID"] = jQuery("#user-id").val();
	if ( jQuery('#auto_draft').val() == '1' )
		post_data["auto_draft"] = '1';

	if ( doAutoSave ) {
		autosaveLast = post_data["post_title"] + post_data["content"];
		jQuery(document).triggerHandler('wpcountwords', [ post_data["content"] ]);
	} else {
		post_data['autosave'] = 0;
	}

	if ( post_data["auto_draft"] == '1' ) {
		successCallback = autosave_saved_new; // new post
	} else {
		successCallback = autosave_saved; // pre-existing post
	}

	autosaveOldMessage = jQuery('#autosave').html();
	jQuery.ajax({
		data: post_data,
		beforeSend: doAutoSave ? autosave_loading : null,
		type: "POST",
		url: ajaxurl,
		success: successCallback
	});
}