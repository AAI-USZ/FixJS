function cGR_onStreamComplete(aLoader,
                                                    aContext,
                                                    aStatus,
                                                    aResultLength,
                                                    aResult) {
        if (!aResult || !Components.isSuccessCode(aStatus)) {
            this.fail(aStatus, aResult);
            return;
        }

        let httpChannel = aLoader.request.QueryInterface(Components.interfaces.nsIHttpChannel);

        // Convert the stream, falling back to utf-8 in case its not given.
        let result = cal.convertByteArray(aResult, aResultLength, httpChannel.contentCharset);
        if (result === null) {
            this.fail(Components.results.NS_ERROR_FAILURE,
                      "Could not convert bytestream to Unicode: " + e);
            return;
        }

        // Calculate Google Clock Skew
        let serverDate = new Date(httpChannel.getResponseHeader("Date"));
        let curDate = new Date();

        // The utility function getCorrectedDate in calGoogleUtils.js recieves
        // its clock skew seconds from here. The clock skew is updated on each
        // request and is therefore quite accurate.
        getCorrectedDate.mClockSkew = curDate.getTime() - serverDate.getTime();

        // Remember when this request happened
        this.requestDate = jsDateToDateTime(serverDate);

        // Handle all (documented) error codes
        switch (httpChannel.responseStatus) {
            case 200: /* No error. */
            case 201: /* Creation of a resource was successful. */
                // Everything worked out, we are done
                this.succeed(result);
                break;

            case 401: /* Authorization required. */
            case 403: /* Unsupported standard parameter, or authentication or
                         Authorization failed. */
                cal.LOG("[calGoogleCalendar] Login failed for " + this.mSession.userName +
                        " HTTP Status " + httpChannel.responseStatus);

                // login failed. auth token must be invalid, password too

                if (this.type == this.MODIFY ||
                    this.type == this.DELETE ||
                    this.type == this.ADD) {
                    // Encountering this error on a write request means the
                    // calendar is readonly
                    this.fail(Components.interfaces.calIErrors.CAL_IS_READONLY, result);
                } else if (!this.reauthenticate) {
                    // If no reauth was requested, then don't invalidate the
                    // whole session and just bail out
                    this.fail(kGOOGLE_LOGIN_FAILED, result);
                } else if (this.type == this.LOGIN) {
                    // If this was a login request itself, then fail it.
                    // That will take care of logging in again
                    this.mSession.invalidate();
                    this.fail(kGOOGLE_LOGIN_FAILED, result);
                } else {
                    // Retry the request. Invalidating the session will trigger
                    // a new login dialog.
                    this.mSession.invalidate();
                    this.mSession.asyncItemRequest(this);
                }

                break;
            case 404: /* The resource was not found on the server, which is
                         also a conflict */
                //  404 NOT FOUND: Resource (such as a feed or entry) not found.
                this.fail(kGOOGLE_CONFLICT_DELETED, "");
                break;
            case 409: /* Specified version number doesn't match resource's
                         latest version number. */
                this.fail(kGOOGLE_CONFLICT_MODIFY, result);
                break;
            case 400:
                //  400 BAD REQUEST: Invalid request URI or header, or
                //                   unsupported nonstandard parameter.

                // HACK Ugh, this sucks. If we send a lower sequence number, Google
                // will throw a 400 and not a 409, even though both cases are a conflict.
                if (result == "Cannot decrease the sequence number of an event") {
                    this.fail(kGOOGLE_CONFLICT_MODIFY, "SEQUENCE-HACK");
                    break;
                }

                // Otherwise fall through
            default:
                // The following codes are caught here:
                //  500 INTERNAL SERVER ERROR: Internal error. This is the
                //                             default code that is used for
                //                             all unrecognized errors.
                //

                // Something else went wrong
                let error = "A request Error Occurred. Status Code: " +
                            httpChannel.responseStatus + " " +
                            httpChannel.responseStatusText + " Body: " +
                            result;

                this.fail(Components.results.NS_ERROR_NOT_AVAILABLE, error);
                break;
        }
    }