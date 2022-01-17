function(type, url, data, success, error, complete, dontRetry) {
        var that = this,
            retryFn = function() { that.ajax(type, url, data, success, error, complete, true); };
        $j.ajax({
            type: type,
            url: url,
            processData: true,
            data: data,
            dataType: 'json',
            success: success,
            error: (dontRetry) ? error : that.retryHandler(retryFn, error),
            complete: complete,
            beforeSend: function(xhr) {
                if (that.sessionHeader)
                    xhr.setRequestHeader(that.SESSION_HEADER, that.sessionHeader);
            }
        });
    }