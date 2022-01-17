function(user, callback, errorCallback) {
            $.ajax({
                url: "../rest/user",
                contentType: "application/json",
                dataType: "json",
                type: "POST",
                cache: false,
                data: JSON.stringify(user),
                success: function(data) {
                    callback(data);
                },
                error: function(error) {
                    // TODO: Show error at correct position in UI?
                    var errorMsg = "error registering user - " + error.status;
                    console.log(errorMsg);
                    if (errorCallback) {
                        errorCallback(error);
                    }
                }
            });
        }