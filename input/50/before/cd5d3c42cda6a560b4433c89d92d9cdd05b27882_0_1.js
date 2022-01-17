function checkErrorMessage(message) {
                if (message.indexOf(REASON) === -1) {
                    deferred.reject(new Error(
                        "Error was thrown when calling .end(): " + message
                    ));
                }
            }