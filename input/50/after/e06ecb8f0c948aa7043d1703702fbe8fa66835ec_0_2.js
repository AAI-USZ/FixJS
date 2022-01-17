function(device, error) {
                if (!error && device)
                    this._haveFingerprintReader = true;
            }