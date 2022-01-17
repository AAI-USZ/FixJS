function(elem, options) {
        options.wrapper_search.find("input:first")
            .bind("keydown", function(event) { // don't navigate away from the field on tab when selecting an item
                if (event.keyCode === $.ui.keyCode.TAB && $(this).data("autocomplete").menu.active) {
                    event.preventDefault();
                }
            })
            .bind("focus", function() {
                options.wrapper_autocomplete.addClass("grp-state-focus");
            })
            .bind("blur", function() {
                options.wrapper_autocomplete.removeClass("grp-state-focus");
            })
            .autocomplete({
                minLength: 1,
                delay: 1000,
                position: {my: "left top", at: "left bottom", of: options.wrapper_autocomplete},
                open: function(event, ui) {
                    $(".ui-menu").width(options.wrapper_autocomplete.outerWidth()-6);
                },
                source: function(request, response) {
                    $.ajax({
                        url: options.autocomplete_lookup_url,
                        dataType: 'json',
                        data: "term=" + request.term + "&app_label=" + grappelli.get_app_label(elem) + "&model_name=" + grappelli.get_model_name(elem) + "&query_string=" + grappelli.get_query_string(elem),
                        beforeSend: function (XMLHttpRequest) {
                            options.loader.show();
                        },
                        success: function(data){
                            response($.map(data, function(item) {
                                return {label: item.label, value: item.value};
                            }));
                        },
                        complete: function (XMLHttpRequest, textStatus) {
                            options.loader.hide();
                        }
                    });
                },
                focus: function() { // prevent value inserted on focus
                    return false;
                },
                select: function(event, ui) { // add repr, add value
                    repr_add(elem, ui.item.label, options);
                    value_add(elem, ui.item.value, options);
                    elem.val() ? $(options.remove_link).show() : $(options.remove_link).hide();
                    $(this).val("").focus();
                    return false;
                }
            })
            .data("autocomplete")._renderItem = function(ul,item) {
                return $("<li></li>")
                    .data( "item.autocomplete", item )
                    .append( "<a>" + item.label + " (" + item.value + ")")
                    .appendTo(ul);
            };
    }