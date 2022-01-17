function(xmlhttp, url, isSync, action, handlerMethod, handlerObj, callback, params)
    {
        log(xmlhttp.responseText);

        var now = (new Date()).getTime();
        var rc = xmlhttp && (xmlhttp.status >= 200 && xmlhttp.status < 300) ?
                 this.createResponse(xmlhttp, url, isSync, action, handlerMethod, callback, params) :
                 this.createResponseError(xmlhttp, url, isSync, action, handlerMethod, callback, params);

        // Response callback is called in all cases, some errors can be ignored
        if (handlerObj) {
            handlerObj.onResponseComplete(rc);
        }
        debug('handleResponse: ' + action + ", method=" + handlerMethod + ", mode=" + (isSync ? "Sync" : "Async") + ", status=" + rc.status + ', error=' + rc.errCode + ' ' + rc.errString);

        // Prevent from showing error dialog on every error until success, this happens in case of wrong credentials or endpoint and until all views not refreshed,
        // also ignore not supported but implemented API calls, handle known cases when API calls are not supported yet
        if (rc.hasErrors) {
            this.displayError(rc.action + ": " + rc.errCode + ": " + rc.errString + ': ' + (params || ""));
        } else {
            // Pass the result and the whole response object if it is null
            if (callback) {
                callback(rc.result, rc);
            }
        }
        return rc.result;
    }