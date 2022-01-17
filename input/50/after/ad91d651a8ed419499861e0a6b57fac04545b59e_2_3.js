function() {
                caughtError = false;

                try {
                    referenceError
                } catch(e) {
                    caughtError = true;
                }
            }