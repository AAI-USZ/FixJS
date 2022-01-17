function showPrefix(prefix, parent_container, relative) {

	// add main prefix container
	if (relative == null) {
		parent_container.append('<div id="prefix_entry' + prefix.id + '" data-prefix-id="' + prefix.id + '">');
	} else {
		if (relative.orientation == 'before') {
			relative.reference.before('<div id="prefix_entry' + prefix.id + '">');
		} else {
			relative.reference.after('<div id="prefix_entry' + prefix.id + '">');
		}
	}

	var prefix_entry = $('#prefix_entry' + prefix.id);
	prefix_entry.data('prefix_id', prefix.id);
	prefix_entry.addClass('prefix_entry');
	prefix_entry.append('<div id="prefix_row' + prefix.id + '">');
	var prefix_row = $('#prefix_row' + prefix.id );
	if (prefix.match == true) {
		prefix_row.addClass("row_match");
	} else {
		prefix_row.addClass("row_collateral");
	}

	// add indent and prefix container
	prefix_row.append('<div id="prefix_ind_pref' + prefix.id + '">');
	var prefix_ind_pref = $('#prefix_ind_pref' + prefix.id);
	prefix_ind_pref.addClass('prefix_column');
	prefix_ind_pref.addClass('prefix_ind_pref');

	// add indent
	prefix_ind_pref.append('<div id="prefix_indent' + prefix.id + '">');
	var prefix_indent = $('#prefix_indent' + prefix.id);
	prefix_indent.addClass("prefix_indent");
	prefix_indent.html('<div id="prefix_exp' + prefix.id + '"></div>');
	var prefix_exp = $('#prefix_exp' + prefix.id);
	prefix_exp.addClass("prefix_exp");

	// If the prefixes has children  (or we do not know), add expand button
	if (prefix.children == 0 || hasMaxPreflen(prefix)) {

		// the prefix_indent container must contain _something_
		prefix_exp.html('&nbsp;');

	} else {

		// add expand button
		prefix_exp.html('+');
		$('#prefix_exp' + prefix.id).click(function (e) {
			collapseClick(prefix.id);
			e.stopPropagation();
		});

		// If we are sure that the children has been fetched, the group will
		// already be fully expanded and a minus sign should be shown
		if (prefix.children == 1) {
			prefix_exp.html("-");
		}

	}

	prefix_indent.width(prefix_indent.width() + 30 * prefix.indent);

	// add prefix
	prefix_ind_pref.append('<div id="prefix_prefix' + prefix.id + '">');
	var prefix_prefix = $('#prefix_prefix' + prefix.id);
	prefix_prefix.addClass('prefix_column');
	prefix_prefix.addClass('prefix_prefix');

	// Different actions for different list types...
	// First: select a prefix in the list
	if (prefix_link_type == 'select') {

		prefix_prefix.html('<a href="javascript:void(0);" onClick="selectPrefix(' +
			prefix.id + '); return false;">' + prefix.display_prefix + '</a>');

	// Add prefix to pool
	} else if (prefix_link_type == 'add_to_pool') {

		prefix_prefix.html('<a href="/pool/add_prefix/' + pool_id + '?prefix=' +
			prefix.id + '&schema=' + schema_id + '" onClick="addToPool(' + prefix.id +
			'); return false;">' + prefix.display_prefix + '</a>');

	// Or edit prefix
	} else {
		prefix_prefix.html(prefix.display_prefix);
	}

	// add button if list not used to select prefix to add to pool or select
	// prefix to allocate from
	if (prefix_link_type != 'select' && prefix_link_type != 'add_to_pool') {
		prefix_row.append('<div id="prefix_button_col' + prefix.id + '">');
		var prefix_button_col = $('#prefix_button_col' + prefix.id);
		prefix_button_col.addClass('prefix_column');
		prefix_button_col.addClass('prefix_button_col');
		prefix_button_col.append('<div id="prefix_button' + prefix.id + '" data-prefix-id="' + prefix.id + '">');

		var prefix_button = $('#prefix_button' + prefix.id);
		prefix_button.addClass('minibutton');
		prefix_button.addClass('prefix_button');
		prefix_button.html("<div class='prefix_button_icon' class='prefix_button_icon'>&nbsp;</div>");
		prefix_button.click(prefix, function(e) {
			showPrefixMenu(e.currentTarget.getAttribute('data-prefix-id'));
			e.preventDefault();
			e.stopPropagation();
		});
	}

	// Add prefix type
	prefix_row.append('<div id="prefix_type' + prefix.id + '">');
	var prefix_type = $('#prefix_type' + prefix.id);
	prefix_type.addClass('prefix_column');
	prefix_type.addClass('prefix_type');
	prefix_type.append('<div id="prefix_type_icon' + prefix.id + '">');
	var prefix_type_icon = $('#prefix_type_icon' + prefix.id);
	prefix_type_icon.addClass('prefix_type_icon');
	prefix_type_icon.addClass('prefix_type_' + prefix.type);

	// Add tooltip to prefix type icon
	prefix_type_icon.addClass('tooltip');
	prefix_type_icon.attr('title', prefix.type[0].toUpperCase() + prefix.type.slice(1));
	prefix_type_icon.html(prefix.type[0].toUpperCase());

	// Add order number
	prefix_row.append('<div id="prefix_order_id' + prefix.id + '">');
	var prefix_order_id = $('#prefix_order_id' + prefix.id);
	prefix_order_id.addClass('prefix_column');
	prefix_order_id.addClass('prefix_order_id');
	if (prefix.order_id == null || prefix.order_id == '') {
		prefix_order_id.html("&nbsp;");
	} else {
		prefix_order_id.html(prefix.order_id);
	}

	// Add VRF
	prefix_row.append('<div id="prefix_vrf' + prefix.id + '">');
	var prefix_vrf = $('#prefix_vrf' + prefix.id);
	prefix_vrf.addClass('prefix_column');
	prefix_vrf.addClass('prefix_vrf');
	if (prefix.vrf == null || prefix.vrf == '') {
		prefix_vrf.html("&nbsp;");
	} else {
		prefix_vrf.html(prefix.vrf);
	}

	// Add node
	prefix_row.append('<div id="prefix_node' + prefix.id + '">');
	var prefix_node = $('#prefix_node' + prefix.id);
	prefix_node.addClass('prefix_column');
	prefix_node.addClass('prefix_node');
	if (prefix.node == null || prefix.node == '') {
		prefix_node.html("&nbsp;");
	} else {
		prefix_node.html(prefix.node);
	}

	// Add prefix description
	prefix_row.append('<div id="prefix_description' + prefix.id + '">');
	var prefix_description = $('#prefix_description' + prefix.id);
	prefix_description.addClass('prefix_column');
	prefix_description.addClass('prefix_description');
	if (prefix.description == null || prefix.description == '') {
		prefix_description.html("&nbsp;");
	} else {
		prefix_description.html(prefix.description);
	}

}