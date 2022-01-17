function refreshSharedOverlays() {
        received_shared_overlays = false;
        $.ajax({
            url : 'v4/shared_overlay',
            data : { name : room_name, limit : 0, format : 'json' },
            accepts : 'application/json',
            success : receivedSharedOverlays,
            error : errorHandler(either(args, 'refreshSharedOverlaysError', noop)),
            beforeSend : function(xhr) { xhr.setRequestHeader('Authorization', hash)}
        });
    }