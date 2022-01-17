function(data, text_status, xhr){
        if (data['questions'].length > 0){
            $('#pager').toggle(data['paginator'] !== '').html(data['paginator']);
            $('#questionCount').html(data['question_counter']);
            render_search_tags(data['query_data']['tags'], data['query_string']);
            if(data['faces'].length > 0) {
                $('#contrib-users > a').remove();
                $('#contrib-users').append(data['faces'].join(''));
            }
            render_related_tags(data['related_tags'], data['query_string']);
            render_relevance_sort_tab(data['query_string']);
            set_active_sort_tab(data['query_data']['sort_order'], data['query_string']);
            if(data['feed_url']){
                // Change RSS URL
                $("#ContentLeft a.rss:first").attr("href", data['feed_url']);
            }

            // Patch scope selectors
            $('#scopeWrapper > a.scope-selector').each(function(index) {
                var old_qs = $(this).attr('href').replace(search_url, '');
                var scope = QSutils.get_query_string_selector_value(old_qs, 'scope');
                qs = QSutils.patch_query_string(data['query_string'], 'scope:' + scope);
                $(this).attr('href', search_url + qs);
            });

            // Patch "Ask your question"
            var askButton = $('#askButton');
            var askHrefBase = askButton.attr('href').split('?')[0];
            askButton.attr('href', askHrefBase + data['query_data']['ask_query_string']); /* INFO: ask_query_string should already be URL-encoded! */


            query.focus();

            var old_list = $('#' + q_list_sel);
            var new_list = $('<div></div>').hide().html(data['questions']);
            old_list.stop(true).after(new_list).fadeOut(200, function() {
                //show new div with a fadeIn effect
                old_list.remove();
                new_list.attr('id', q_list_sel);
                new_list.fadeIn(400);            
            });
        }
    }