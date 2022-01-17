function(field_id, field_name, is_stacked, admin_static_prefix) {
        if (field_id.match(/__prefix__/)){
            // Don't intialize on empty forms.
            return;
        }
        var from_box = document.getElementById(field_id);
        from_box.id += '_from'; // change its ID
        from_box.className = 'filtered';

        var ps = from_box.parentNode.getElementsByTagName('p');
        for (var i=0; i<ps.length; i++) {
            if (ps[i].className.indexOf("info") != -1) {
                // Remove <p class="info">, because it just gets in the way.
                from_box.parentNode.removeChild(ps[i]);
            } else if (ps[i].className.indexOf("help") != -1) {
                // Move help text up to the top so it isn't below the select
                // boxes or wrapped off on the side to the right of the add
                // button:
                from_box.parentNode.insertBefore(ps[i], from_box.parentNode.firstChild);
            }
        }

        // <div class="selector"> or <div class="selector stacked">
        var selector_div = quickElement('div', from_box.parentNode);
        selector_div.className = is_stacked ? 'selector stacked' : 'selector';

        // <div class="selector-available">
        var selector_available = quickElement('div', selector_div, '');
        selector_available.className = 'selector-available';
        var title_available = quickElement('h2', selector_available, interpolate(gettext('Available %s') + ' ', [field_name]));
        quickElement('img', title_available, '', 'src', admin_static_prefix + 'img/icon-unknown.gif', 'width', '10', 'height', '10', 'class', 'help help-tooltip', 'title', interpolate(gettext('This is the list of available %s. You may choose some by selecting them in the box below and then clicking the "Choose" arrow between the two boxes.'), [field_name]));

        var filter_p = quickElement('p', selector_available, '', 'id', field_id + '_filter');
        filter_p.className = 'selector-filter';

        var search_filter_label = quickElement('label', filter_p, '', 'for', field_id + "_input");

        var search_selector_img = quickElement('img', search_filter_label, '', 'src', admin_static_prefix + 'img/selector-search.gif', 'class', 'help-tooltip', 'alt', '', 'title', interpolate(gettext("Type into this box to filter down the list of available %s."), [field_name]));

        filter_p.appendChild(document.createTextNode(' '));

        var filter_input = quickElement('input', filter_p, '', 'type', 'text', 'placeholder', gettext("Filter"));
        filter_input.id = field_id + '_input';

        selector_available.appendChild(from_box);
        var choose_all = quickElement('a', selector_available, gettext('Choose all'), 'title', interpolate(gettext('Click to choose all %s at once.'), [field_name]), 'href', 'javascript: (function(){ SelectBox.move_all("' + field_id + '_from", "' + field_id + '_to"); SelectFilter.refresh_icons("' + field_id + '");})()', 'id', field_id + '_add_all_link');
        choose_all.className = 'selector-chooseall';

        // <ul class="selector-chooser">
        var selector_chooser = quickElement('ul', selector_div, '');
        selector_chooser.className = 'selector-chooser';
        var add_link = quickElement('a', quickElement('li', selector_chooser, ''), gettext('Choose'), 'title', gettext('Choose'), 'href', 'javascript: (function(){ SelectBox.move("' + field_id + '_from","' + field_id + '_to"); SelectFilter.refresh_icons("' + field_id + '");})()', 'id', field_id + '_add_link');
        add_link.className = 'selector-add';
        var remove_link = quickElement('a', quickElement('li', selector_chooser, ''), gettext('Remove'), 'title', gettext('Remove'), 'href', 'javascript: (function(){ SelectBox.move("' + field_id + '_to","' + field_id + '_from"); SelectFilter.refresh_icons("' + field_id + '");})()', 'id', field_id + '_remove_link');
        remove_link.className = 'selector-remove';

        // <div class="selector-chosen">
        var selector_chosen = quickElement('div', selector_div, '');
        selector_chosen.className = 'selector-chosen';
        var title_chosen = quickElement('h2', selector_chosen, interpolate(gettext('Chosen %s') + ' ', [field_name]));
        quickElement('img', title_chosen, '', 'src', admin_static_prefix + 'img/icon-unknown.gif', 'width', '10', 'height', '10', 'class', 'help help-tooltip', 'title', interpolate(gettext('This is the list of chosen %s. You may remove some by selecting them in the box below and then clicking the "Remove" arrow between the two boxes.'), [field_name]));

        var to_box = quickElement('select', selector_chosen, '', 'id', field_id + '_to', 'multiple', 'multiple', 'size', from_box.size, 'name', from_box.getAttribute('name'));
        to_box.className = 'filtered';
        var clear_all = quickElement('a', selector_chosen, gettext('Remove all'), 'title', interpolate(gettext('Click to remove all chosen %s at once.'), [field_name]), 'href', 'javascript: (function() { SelectBox.move_all("' + field_id + '_to", "' + field_id + '_from"); SelectFilter.refresh_icons("' + field_id + '");})()', 'id', field_id + '_remove_all_link');
        clear_all.className = 'selector-clearall';

        from_box.setAttribute('name', from_box.getAttribute('name') + '_old');

        // Set up the JavaScript event handlers for the select box filter interface
        addEvent(filter_input, 'keydown', function(e) { SelectFilter.filter_key_down(e, field_id); });
        addEvent(from_box, 'change', function(e) { SelectFilter.refresh_icons(field_id) });
        addEvent(to_box, 'change', function(e) { SelectFilter.refresh_icons(field_id) });
        addEvent(from_box, 'dblclick', function() { SelectBox.move(field_id + '_from', field_id + '_to'); SelectFilter.refresh_icons(field_id); });
        addEvent(to_box, 'dblclick', function() { SelectBox.move(field_id + '_to', field_id + '_from'); SelectFilter.refresh_icons(field_id); });
        addEvent(findForm(from_box), 'submit', function() { SelectBox.select_all(field_id + '_to'); });
        SelectBox.init(field_id + '_from');
        SelectBox.init(field_id + '_to');
        // Move selected from_box options to to_box
        SelectBox.move(field_id + '_from', field_id + '_to');

        if (!is_stacked) {
            // In horizontal mode, give the same height to the two boxes.
            var j_from_box = $(from_box);
            var j_to_box = $(to_box);
            var resize_filters = function() { j_to_box.height($(filter_p).outerHeight() + j_from_box.outerHeight()); }
            if (j_from_box.outerHeight() > 0) {
                resize_filters(); // This fieldset is already open. Resize now.
            } else {
                // This fieldset is probably collapsed. Wait for its 'show' event.
                j_to_box.closest('fieldset').one('show.fieldset', resize_filters);
            }
        }

        // Initial icon refresh
        SelectFilter.refresh_icons(field_id);
    }