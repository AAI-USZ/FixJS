function(query_text){
        running = true;
        if(!prev_text && query_text && showSortByRelevance) {
            // If there was no query but there is some query now - and we support relevance search - then switch to it */
            query_string = QSutils.patch_query_string(query_string, 'sort:relevance-desc');
        }
        prev_text = update_query_string(query_text);
        query_string = QSutils.patch_query_string(query_string, 'page:1'); /* if something has changed, then reset the page no. */
        var url = search_url + query_string;
        $.ajax({
            url: url,
            dataType: 'json',
            success: render_result,
            complete: function(){
                running = false;
                eval_query();
            },
            cache: false
        });
        var context = { state:1, rand:Math.random() };
        History.pushState( context, "Questions", url );
        setTimeout(function (){
            /* HACK: For some weird reson, sometimes something overrides the above pushState so we re-aplly it
                     This might be caused by some other JS plugin.
                     The delay of 10msec allows the other plugin to override the URL.
            */
            History.replaceState( context, "Questions", url );
        }, 10);
    }