function checkErrorMessage(message) {
                // See http://stackoverflow.com/questions/5913978/cryptic-script-error-reported-in-javascript-in-chrome-and-firefox
                // for an explanation of why we check for "Script error."
                if (message.indexOf(REASON) === -1 &&
                    message !== "Script error.") {
                    deferred.reject(new Error(
                        "Error was thrown when calling .end(): " + message
                    ));
                }
            }