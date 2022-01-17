function(contactId, recordTypeId, success, error, complete, dontRetry) {
        var that = this,
            url = getBaseUrl() + '/ContactDetails',
            timezoneOffset = new Date().getTimezoneOffset(),
            allowComplete = false,
            retryFn = function() { that.getContactDetailsViaApex(contactId, recordTypeId, success, error, complete, true); },
            completeFn = function(jqXHR, status) {
                if (typeof complete == 'function' && (dontRetry || allowComplete)) 
                    complete(jqXHR, status);
            };
        $j.ajax({
            type: 'GET',
            url: url,
            data: 'id=' + contactId + '&rtid=' + (recordTypeId || '') + '&tzOffset=' + timezoneOffset,
            success: success,
            error: (dontRetry) ? error : that.retryHandler(retryFn, error),
            complete: completeFn,
            beforeSend: function(xhr) {
                if (that.sessionHeader)
                    xhr.setRequestHeader(that.SESSION_HEADER, that.sessionHeader);
            }
        }).success(function() { allowComplete = true; });
    }