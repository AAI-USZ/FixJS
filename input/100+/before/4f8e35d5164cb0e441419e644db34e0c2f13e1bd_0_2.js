function(id, option) {
        var from_box = document.getElementById(id + '_from'),
            to_box = document.getElementById(id + '_to');
        if (django.jQuery.browser.msie) {
            option.text_copy = option.text;
            option.appendChild(document.createTextNode(option.text));
        }
        option.displayed = true;
        option.select_boxed = true;
        SelectBox.add_to_options(id, option);
        // We could order alphabetically but what if the data isn't meant to be
        // alphabetical? Just adding to the end is more predictable, not to
        // mention it avoids ordering differences between browsers, databases
        // and l10n.
        option.order = SelectBox.options[id].length;
        SelectBox.insert_option(to_box, option, 0, true);
    }