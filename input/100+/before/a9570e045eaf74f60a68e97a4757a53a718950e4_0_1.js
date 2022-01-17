function(session, req, result) {
        //console.log("respondBasedOnResult => "+JSON.stringify(result));

        // Convert string to JSON
        if (typeof(result) === "string") {
            try {
                result = JSON.parse(result);
            } catch (e) {
                // In case the conversion fails, report and "Invalid Command Method" error
                _errors.handleInvalidReqInvalidCommandMethodEH(req, this);
            }
        }

        // In case the JSON doesn't contain the expected fields
        if (result === null ||
            typeof(result) === "undefined" ||
            typeof(result) !== "object" ||
            typeof(result.status) === "undefined" ||
            typeof(result.value) === "undefined") {
            _errors.handleFailedCommandEH(
                _errors.FAILED_CMD_STATUS.UNKNOWN_ERROR,
                "Command failed without producing the expected error report",
                req,
                this,
                session,
                "ReqHand");
        }

        // An error occurred but we got an error report to use
        if (result.status !== 0) {
            _errors.handleFailedCommandEH(
                _errors.FAILED_CMD_STATUS_CODES_NAMES[result.status],
                result.value.message,
                req,
                this,
                session,
                "ReqHand");
        }

        // If we arrive here, everything should be fine, birds are singing, the sky is blue
        this.success(session.getId(), result.value);
    }