function(e) {
                        defer.reject(buildHttpErrorMessage('CONNECTION_CLOSED', e.message));
                    }