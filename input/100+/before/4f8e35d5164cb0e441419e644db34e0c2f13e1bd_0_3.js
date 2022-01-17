function(id, reverse, all) {
        var from_box = document.getElementById(id + ((!reverse) ? '_from' : '_to')),
            to_box = document.getElementById(id + ((reverse) ? '_from' : '_to')),
            num_selected = 0,
            last_compare_position = 0,
            old_selected_index = from_box.selectedIndex,
            option, compare_text, large_movement, filter_text, filter_tokens;

        if (all) {
            num_selected = from_box.options.length;
        } else {
            if (typeof from_box.selectedOptions !== 'undefined') {
                // Fast method for browsers that support it (Chrome)
                num_selected = from_box.selectedOptions.length;
            } else {
                for (var i = 0; (option = from_box.options[i]); i++) {
                    if (option.selected) num_selected++;
                }
            }
        }

        all = all || num_selected == from_box.options.length;
        // Eventually, moving one node at a time becomes slower than a total redisplay
        large_movement = num_selected > 1000;

        if (reverse) {
            filter_text = document.getElementById(to_box.id.slice(0, -5) + '_input').value;
            if (filter_text) filter_tokens = filter_text.toLowerCase().split(/\s+/);
        }

        if (all && large_movement) {
            for (var i = 0; (option = from_box.options[i]); i++) {
                option.select_boxed = !reverse;
            }
        }

        if (large_movement) {
            SelectBox.redisplay(id, true);
        } else {
            for (var i = 0; (option = from_box.options[i]); i++) {
                if (all || option.selected) {
                    option.select_boxed = !option.select_boxed;

                    // Take the option out of the DOM otherwise setting selected to false
                    // is the slowest thing out of all this code in all browsers except Firefox
                    from_box.removeChild(option);
                    option.selected = false;

                    // Don't add to to_box if there's a filter applied that doesn't match
                    if (!filter_tokens || SelectBox.is_filter_match(filter_tokens, option.text)) {
                        last_compare_position = SelectBox.insert_option(
                            to_box, option, last_compare_position, to_box.options.length == 0
                        );
                    }

                    i--; // We have to decrement because we're modifying as iterating
                }
            }
        }

        // This forces the list to scroll to the top of your previous selection
        // after a chunk movement. Without it you often end up in the middle 
        // of nowhere and lost.
        //
        // 13 and 70 were chosen based on the height of the boxes in the default
        // Django theme and will place the top of your previous selection in
        // about the middle. It needs a slight delay to fire properly in most
        // browsers.
        //
        // It doesn't work in Opera because Opera doesn't let you set scrollTop on
        // select elements. But Opera does almost the same by default anyway
        // (basically it won't have the -70).
        if (!django.jQuery.browser.opera && (large_movement || num_selected > 13)) {
            setTimeout(function() {
                from_box.selectedIndex = old_selected_index;
                var scroll_position = from_box.scrollTop - 70;
                from_box.selectedIndex = -1;
                from_box.scrollTop = scroll_position;
            }, 10);
        }
    }