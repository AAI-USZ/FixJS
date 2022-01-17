function(contactId, recordTypeId, success, error, complete, dontRetry) {
        var that = this,
            url = getBaseUrl() + '/ContactDetails',
            timezoneOffset = new Date().getTimezoneOffset(),
            retryFn = function() { that.getContactDetailsViaApex(contactId, recordTypeId, success, error, complete, true); };
        $j.ajax({
            type: 'GET',
            url: url,
            data: 'id=' + contactId + '&rtid=' + (recordTypeId || '') + '&tzOffset=' + timezoneOffset,
            success: success,
            error: (dontRetry) ? error : that.retryHandler(retryFn, error),
            complete: complete,
            beforeSend: function(xhr) {
                if (that.sessionHeader)
                    xhr.setRequestHeader(that.SESSION_HEADER, that.sessionHeader);
            }
        });
    }