function(type, url, data, success, error, complete, dontRetry) {
        var that = this,
            allowComplete = false,
            retryFn = function() { that.ajax(type, url, data, success, error, complete, true); }
            completeFn = function(jqXHR, status) {
                if (typeof complete == 'function' && (dontRetry || allowComplete)) 
                    complete(jqXHR, status);
            };
        $j.ajax({
            type: type,
            url: url,
            processData: true,
            data: data,
            dataType: 'json',
            success: success,
            error: (dontRetry) ? error : that.retryHandler(retryFn, error),
            complete: completeFn,
            beforeSend: function(xhr) {
                if (that.sessionHeader)
                    xhr.setRequestHeader(that.SESSION_HEADER, that.sessionHeader);
            }
        }).success(function() { allowComplete = true; });
    }