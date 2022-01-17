function refreshOverlays() {
        received_overlays = false;
        var url = 'v4/overlay?';
        iter(roles, function(r) {
            url += "roles__id=" + r.id + "&"
        });
        url = url.substring(0, url.length-1);

        $.ajax({
            url : url,
            data : {
                room__name : room_name,
                limit : 0,
                format : 'json'
            },
            accepts : 'application/json',
            success : receivedOverlays,
            error : errorHandler(either(args, 'refreshOverlaysError', noop))
        });
    }