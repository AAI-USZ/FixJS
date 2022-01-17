function cGR_prepareChannel(aChannel) {

        // No caching
        aChannel.loadFlags |= Components.interfaces.nsIRequest.LOAD_BYPASS_CACHE;

        // Set upload Data
        if (this.mUploadData) {
            let converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].
                            createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
            converter.charset = "UTF-8";

            let stream = converter.convertToInputStream(this.mUploadData);
            aChannel = aChannel.QueryInterface(Components.interfaces.nsIUploadChannel);
            aChannel.setUploadStream(stream, this.mUploadContent, -1);

            if (this.mType == this.LOGIN) {
                cal.LOG("[calGoogleCalendar] Setting upload data for login request (hidden)");
            } else {
                cal.LOG("[calGoogleCalendar] Setting Upload Data (" +
                        this.mUploadContent + "):\n" + this.mUploadData);
            }
        }

        aChannel  = aChannel.QueryInterface(Components.interfaces.nsIHttpChannel);

        // Depending on the preference, we will use X-HTTP-Method-Override to
        // get around some proxies. This will default to true.
        if (getPrefSafe("calendar.google.useHTTPMethodOverride", true) &&
            (this.method == "PUT" || this.method == "DELETE")) {

            aChannel.requestMethod = "POST";
            aChannel.setRequestHeader("X-HTTP-Method-Override",
                                      this.method,
                                      false);
            if (this.method == "DELETE") {
                // DELETE has no body, set an empty one so that Google accepts
                // the request.
                aChannel.setRequestHeader("Content-Type",
                                          "application/atom+xml; charset=UTF-8",
                                          false);
                aChannel.setRequestHeader("Content-Length", 0, false);
            }
        } else {
            aChannel.requestMethod = this.method;
        }

        // Add Authorization
        if (this.mSession.authToken) {
            aChannel.setRequestHeader("Authorization",
                                      "GoogleLogin auth="
                                      +  this.mSession.authToken,
                                      false);
        }
    }