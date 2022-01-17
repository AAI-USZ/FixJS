function() {
                caughtError = false;
                setTimeout(function() {
                    try {
                        referenceError
                    } catch(e) {
                        caughtError = true;
                    }
                }, 0)
            }