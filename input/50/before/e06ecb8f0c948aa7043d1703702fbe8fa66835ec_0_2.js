function(device, error) {
                if (!error && device)
                    this._haveFingerprintReader = true;

                if (this._haveFingerprintReader)
                    this._greeterClient.call_start_conversation(_FINGERPRINT_SERVICE_NAME);
            }