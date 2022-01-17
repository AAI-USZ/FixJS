function(error) {
                    // TODO: Show error at correct position in UI?
                    var errorMsg = "error registering user -" + error.status;
                    console.log(errorMsg);
                    if (errorCallback) {
                        errorCallback(errorMsg);
                    }
                }