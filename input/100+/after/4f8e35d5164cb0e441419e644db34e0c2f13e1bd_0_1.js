function(id) {
        var box = document.getElementById(id + '_from'),
            node;

        SelectBox.options[id] = new Array();
        for (var i = 0; (node = box.options[i]); i++) {
            node.order = i; // Record the initial order
            if (django.jQuery.browser.msie) node.text_copy = node.text;
            node.displayed = true;
            node.select_boxed = false;
            SelectBox.add_to_options(id, node);
        }

        SelectBox.move(id);
        // This prevents a jump on focus if options have been moved out
        box.selectedIndex = -1;

        SelectBox.register_onpopstate();
        SelectBox.initialised = true;
    }