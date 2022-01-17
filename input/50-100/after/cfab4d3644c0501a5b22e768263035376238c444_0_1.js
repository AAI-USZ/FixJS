function() {
        if($('#article').data('allow-mark-as-read') != 'True')
            return;
        $('#mark_as_read').removeClass('hiding');
        mark_as_read_if_needed();
    }, {'offset': '100%'}