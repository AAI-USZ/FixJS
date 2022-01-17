function init_search_view(view) {
    var search_entry = view._header.find('.search_entry');
    search_entry.keypress(function (ev) {
        if (ev.keyCode == 13) {
            ui.SearchView.do_search(view, search_entry.val());    
        }
    });
    view._header.find('.search_entry_clear_btn').click(function () {
        search_entry.val('');
        ui.SearchView.clear(view);    
    });
    var toggle = view._header.find('.search_view_toggle');
    var sub_view_btns = toggle.find('.mochi_list_item');
    sub_view_btns.click(function (event) {
        var pagename = $(this).attr('href').substring(1);
        sub_view_btns.removeClass('selected');
        $(this).addClass('selected');
        ui.SearchView.switch_sub_view(view, pagename);
    });

    var saved_searches_more_menu = $('#saved_searches_more_menu');
    $('#saved_searches_more_trigger').mouseleave(function () {
        saved_searches_more_menu.hide();
    });

    $('#saved_searches_btn').click(function () {
        globals.twitterClient.get_saved_searches(function (result) {
            saved_searches_more_menu.find('.saved_search_item').remove();
            var arr = [];
            for (var i = 0; i < result.length; i += 1) {
                arr.push(
                    '<li><a class="saved_search_item" qid="'+result[i].id_str+'" href="javascript:void(0);">'+result[i].query+'</a></li>'
                    );
            }
            saved_searches_more_menu.append(arr.join('\n'));
            saved_searches_more_menu.show();
        }, function () {
            console.log("Error");
        });
    });

    saved_searches_more_menu.find('.saved_search_item').live('click', function () {
        ui.SearchView.do_search(view, $(this).text().trim());
        saved_searches_more_menu.hide();
        return false;
    });

    $('#create_saved_search_btn').click(function () {
        var query = search_entry.val().trim();
        if (query.length == 0) return;
        open_search(query);
        /*
        var query = search_entry.val().trim();
        globals.twitterClient.create_saved_search(query, function () {
            toast.set('Saved Query "'+query+'"').show();
        }, function () {
            console.log("Too more queries");
        });
        */
    });

    widget.autocomplete.connect(search_entry);
}