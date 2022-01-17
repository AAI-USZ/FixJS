function showPrefixMenu(prefix_id) {

	// Add prefix menu
	var button = $('#prefix_button' + prefix_id);
	var menu = getPopupMenu(button, 'prefix', prefix_id);

	// Add different manu entries depending on where the prefix list is displayed
	if (prefix_link_type == 'select') {
		// select prefix (allocate from prefix function on add prefix page)
	} else if (prefix_link_type == 'add_to_pool') {
		// Add to pool (Add prefix to pool on edit pool page)
	} else {
		// ordinary prefix list
		menu.append('<a href="/prefix/edit/' + prefix_id + '?schema=' + schema_id + '">Edit</a>');
		menu.append('<a id="prefix_remove' + prefix_id + '" href="/prefix/remove/' + prefix_id + '?schema=' + schema_id + '">Remove</a>');
		$('#prefix_remove' + prefix_id).click(function(e) {
			e.preventDefault();
			var dialog = showDialogYesNo('Really remove prefix?', 'Are you sure you want to remove the prefix ' + prefix_list[prefix_id].display_prefix + '?',
				function () {
					var data = {
						'schema': schema_id,
						'id': prefix_id
					};
					$.getJSON('/xhr/remove_prefix', data, prefixRemoved);

					hidePopupMenu();
					dialog.dialog('close');

				});
		});
	}

	// and display the menu with a nice slide down animation
	menu.slideDown('fast');

}