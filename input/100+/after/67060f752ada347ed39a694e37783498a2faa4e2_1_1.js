function(credentials, callback, errorCallback) {
            $.ajax({
                url: "../rest/authentication",
                type: "POST",
                data: credentials,
                cache: false,
                success: function(data) {
                    loggedIn = true;
                    user = data;
                    callback(data);
                },
                error: function(error) {
                    loggedIn = false;
                    user = null;
                    // TODO: Show error at correct position in UI?
                    var errorMsg = "error adding blog post -" + error.status;
                    console.log(errorMsg);
                    if (errorCallback) {
                        errorCallback(errorMsg);
                    }
                }
            });
        }