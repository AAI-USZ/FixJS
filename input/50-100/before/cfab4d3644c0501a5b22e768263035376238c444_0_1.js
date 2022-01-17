function() {
        if($('#article').data('article-current') == 'False' || $('#article').data('article-changed') == 'False')
            return;
        $('#mark_as_read').removeClass('hiding');
        mark_as_read_if_needed();
    }, {'offset': '100%'}