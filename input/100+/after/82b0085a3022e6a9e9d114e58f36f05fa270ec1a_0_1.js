function(postId, comment, callback, errorCallback) {
            $.ajax({
                url: "../rest/blog/" + postId + "/comment",
                contentType: "application/json",
                dataType: "json",
                type: "POST",
                data: JSON.stringify(comment),
                cache: false,
                success: function(data) {
                    callback(data);
                },
                error: function(error) {
                    // TODO: Show error at correct position in UI?
                    var errorMsg = "error adding comment -" + error.status;
                    console.log(errorMsg);
                    if (errorCallback) {
                        errorCallback(errorMsg);
                    }
                }
            });
        }