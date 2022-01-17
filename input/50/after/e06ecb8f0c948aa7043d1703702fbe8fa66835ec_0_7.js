function(client, serviceName) {
        // if the password service fails, then cancel everything.
        // But if, e.g., fingerprint fails, still give
        // password authentication a chance to succeed
        if (serviceName == _PASSWORD_SERVICE_NAME) {
            this._userVerifier.call_cancel_sync(null);
        } else if (serviceName == _FINGERPRINT_SERVICE_NAME) {
            _fadeOutActor(this._promptFingerprintMessage);
        }
    }