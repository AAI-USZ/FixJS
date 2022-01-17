function(xmlhttp, url, isSync, action, handlerMethod, callback, params)
    {
        var rc = this.createResponse(xmlhttp, url, isSync, action, handlerMethod, callback, params);
        rc.errCode = "Unknown: " + (xmlhttp ? xmlhttp.status : 0);
        rc.errString = "An unknown error occurred, please check connectivity";
        rc.requestId = "";
        rc.hasErrors = true;

        if (xmlhttp && xmlhttp.responseXML) {
            // EC2 common error reponse format
            rc.errCode = getNodeValue(xmlhttp.responseXML, "Code");
            rc.errString = getNodeValue(xmlhttp.responseXML, "Message");
            rc.requestId = getNodeValue(xmlhttp.responseXML, "RequestID");

            // Route53 error messages
            if (!rc.errString) {
                rc.errString = this.getItms(xmlhttp.responseXML, 'InvalidChangeBatch', 'Messages', [ 'Message' ], function(obj) { return obj.Message });
                if (rc.errString) rc.errCode = "InvalidChangeBatch";
            }
            debug('response error: ' +  action + ", " + xmlhttp.responseText + ", " + rc.errString + ", " + url);
        }
        return rc;
    }