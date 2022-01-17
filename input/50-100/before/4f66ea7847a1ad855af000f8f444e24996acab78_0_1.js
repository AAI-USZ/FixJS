function refreshAnnotations() {
        received_annotations = false;
        $.ajax({
            url : 'v4/annotation',
            data : { room : room.id, limit : 0, format : 'json' },
            accepts : 'application/json',
            success : receivedAnnotations,
            error : errorHandler(either(args, 'refreshAnnotationsError', noop))
        })
    }