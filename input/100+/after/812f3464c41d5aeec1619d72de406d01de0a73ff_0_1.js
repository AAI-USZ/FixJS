function (alarm, applicationId, argument) {
            var alarmStore;

            if (!_security.all && !_security.add)
                throw (new WebAPIError(errorcode.SECURITY_ERR));
            if ((alarm === undefined || !(alarm instanceof Alarm) ||
                (typeof applicationId !== "string") ||
                (argument !== undefined && typeof argument !== "string")))
                throw (new WebAPIError(errorcode.TYPE_MISMATCH_ERR));
            currentAppId = _getCurrentAppId(); // Update The Current URL.
            alarmStore = new AlarmStore(alarm, applicationId, currentAppId, argument);
            _updateDB(alarmStore);
        }