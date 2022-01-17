function(callback, errorCallback) {
            $.ajax({
                // TODO: Replace with REST call
//                url: "../mockData/blogEntries.json",
                url: "../rest/blog",
                cache: false,
                success: function(data) {
                    // TODO: Remove next line when JSON media type is given by server
//                    data = JSON.parse(data);
                    callback(data);
                },
                error: function(error) {
                    var errorMsg = "error retrieving blog posts -" + error.status;
                    console.log(errorMsg);
                    if (errorCallback) {
                        errorCallback(errorMsg);
                    }
                }
            });
        }