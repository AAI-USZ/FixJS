function insertPrefixList(pref_list, start_container, prev_prefix) {

	// return if we did not get any prefixes
	if (pref_list.length == 0) {
		return;
	}

	/*
	 * Keep track of the current "placement method", how prefixes currently
	 * are placed. Can take the values 'parent_container', 'before' and
	 * 'after'.
	 */
	var placement_method = 'parent_container';
	var dist_prefix_id = null;
	var dist_prefix_container = null;

	// If we have a start container, try to fetch its first child
	if (start_container != null) {

		indent_head[pref_list[0].indent] = start_container;
		container = start_container;

		// Fetch first prefix in container, if any
		dist_prefix_container = start_container.children(':first');
		if (dist_prefix_container.length > 0) {

			log('First disturbing prefix in container has ID ' + dist_prefix_container.attr('id'));
			dist_prefix_id = dist_prefix_container.data('prefix_id');

			placement_method = 'before';

		} else {

			log('No disturbing prefix found.');
			dist_prefix_container = null;

			placement_method = 'parent_container';

		}

	}

	// go through received prefixes
	for (key in pref_list) {

		prefix = pref_list[key];
		if (!(prefix.id in prefix_list)) {
			prefix_list[prefix.id] = prefix;
		}

		/*
		 * Compare IDs to see if the prefix we want to place already exists.
		 * This check implicitly also handles the case when we have no
		 * disturbing prefixes, as none of the received prefixes should have ID
		 * null and thus the expression below never be true.
		 */
		if (dist_prefix_id == prefix.id) {

			// Try to fetch the container after the current prefix
			while (true) {

				if (dist_prefix_container.length == 0) {
					// reached end of list, what to do? go parent?
					dist_prefix_id == null;
					placement_method = 'parent_container';
					break;
				} else if (dist_prefix_container.hasClass('prefix_collapse')) {
					// skip over collapse containers
					dist_prefix_container = dist_prefix_container.next();
				} else if (dist_prefix_container.hasClass('prefix_hidden_container')) {
					// enter into hidden containers and continue traversing
					dist_prefix_container = dist_prefix_container.children(':first');
				} else if (dist_prefix_container.attr('data-prefix-id') && parseInt(dist_prefix_container.attr('data-prefix-id')) != dist_prefix_id) {
					dist_prefix_id = parseInt(dist_prefix_container.attr('data-prefix-id'));
					placement_method = 'before';
					break;
				} else {
					dist_prefix_container = dist_prefix_container.next();
				}

			}

			continue;

		}

		// If there is no indent container for the current level, set
		// indent head for current indent level to the top level container.
		if (!(prefix.indent in indent_head)) {
			indent_head[prefix.indent] = $('#prefix_list');
			log("Adding element to top level group");
		}

		// Has indent level increased?
		if (prev_prefix.indent < prefix.indent) {
			// if prefix has childs, do not hide it!  since we are one indent
			// level under last, the previous prefix is our parent and clearly
			// has childs, thus unhide!
			unhide( container.find('.popup_button:first').attr('data-prefix-id') );

			// we get the number of children for assignments from the database
			if (prev_prefix.type == 'assignment') {
				container = indent_head[prefix.indent];

				// add hidden container if this isn't a match
				if (prefix.match != true) {
					container = addHiddenContainer(prefix, container);
				}

			} else if (prev_prefix.type == 'reservation') {
				// If the previous prefix is a reservation, we know (since we are
				// one indent level below previous) that it has at least one
				// child.
				if (prev_prefix.children == -2) {
					prev_prefix.children = -1;
				}
				container = indent_head[prefix.indent];
			}

			// prev_prefix is parent prefix - if it's a match, we don't need to expand it
			if (prev_prefix.match == false) {
				expandGroup(prev_prefix.id);
			}

		} else if (prev_prefix.indent == prefix.indent) {

			// switching into a match from a non-match, so we should display a "expand upwards" arrow
			if (prev_prefix.match == false && prefix.match == true) {

				// we don't bother putting three or less prefixes into a hidden container
				if (parseInt(container.children().length) <= 3) {
					unhide( container.find('.popup_button:first').attr('data-prefix-id') );
				}
				container = indent_head[prefix.indent];
			} else if (prev_prefix.match == true && prefix.match == false) {
				// switching into a non-match from a match, so we should display a "expand downwards" arrow
				container = addHiddenContainer(prefix, container);
			}

		} else {
			// if less than 8 children prefixes total, do not hide
			if (parseInt(container.parent().find('.prefix_entry').length) < 8) {
				unhide( container.find('.popup_button:first').attr('data-prefix-id') );
			}
			container = indent_head[prefix.indent];
		}

		prev_prefix = prefix;

		// Only display prefixes we are supposed to display
		if (prefix.display != true) {
			continue;
		}

		// Place prefix
		if (placement_method == 'parent_container') {
			var relative = null;
		} else if (placement_method == 'before') {
			var relative = {
				'reference': dist_prefix_container,
				'orientation': 'before'
			};
		} else {
			var relative = {
				'reference': dist_prefix_container,
				'orientation': 'after'
			};
		}

		showPrefix(prefix, container, relative);

		// add collapse container for current prefix
		if (!hasMaxPreflen(prefix)) {
			$('#prefix_entry' + prefix.id).after('<div class="prefix_collapse" id="collapse' + prefix.id + '">');
			indent_head[prefix.indent + 1] = $('#collapse' + prefix.id);
		}

	}

	// this last clause is to prevent the last prefixes in a list to be hidden
	// we don't bother putting three or less prefixes into a hidden container
	if (parseInt(container.children().length) <= 3) {
		unhide( container.find('.popup_button:first').attr('data-prefix-id') );
	}

}