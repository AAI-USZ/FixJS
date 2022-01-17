function(contactId, recordTypeId, success, error, complete) {
        var that = this;
        var url = getBaseUrl() + '/ContactDetails';
        var timezoneOffset = new Date().getTimezoneOffset();
        $j.ajax({
            type: 'GET',
            url: url,
            data: 'id=' + contactId + '&rtid=' + (recordTypeId || '') + '&tzOffset=' + timezoneOffset,
            success: success,
            error: error,
            complete: complete,
            beforeSend: function(xhr) {
                if (that.sessionHeader)
                    xhr.setRequestHeader(that.SESSION_HEADER, that.sessionHeader);
            }
        });
    }