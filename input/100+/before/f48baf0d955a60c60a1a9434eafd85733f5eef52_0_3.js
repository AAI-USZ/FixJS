function populate_dropdown (query, results) {
        if(results.length) {
            dropdown.empty();
            var dropdown_ul = $("<ul>")
                .appendTo(dropdown)
                .mouseover(function (event) {
                    select_dropdown_item(get_element_from_event(event, "li"));
                })
                .mousedown(function (event) {
                    add_token(get_element_from_event(event, "li"));
                    return false;
                })
                .hide();

            for(var i in results) {
                if (results.hasOwnProperty(i)) {
                    var this_li = $("<li>"+highlight_term(results[i].name, query)+"</li>")
                                      .appendTo(dropdown_ul);

                    if(i%2) {
                        this_li.addClass(settings.classes.dropdownItem);
                    } else {
                        this_li.addClass(settings.classes.dropdownItem2);
                    }

                    if(i == 0) {
                        select_dropdown_item(this_li);
                    }

                    $.data(this_li.get(0), "tokeninput", {"id": results[i].id, "name": results[i].name});
                }
            }

            dropdown.show();
            dropdown_ul.slideDown("fast");

        } else {
            dropdown
                .html("<p>"+settings.noResultsText+"</p>")
                .show();
        }
    }