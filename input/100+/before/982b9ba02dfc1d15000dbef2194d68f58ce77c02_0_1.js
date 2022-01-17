function (query, callback) {
        _checkDeployment(callback);
        _checkKey(callback);
        var queryNumber;
        if(_debug === true) {
            _queryCounter++;
            queryNumber = _queryCounter;
            console.info("S3QL Query", queryNumber, ":", query);
        }
        $.ajax({
            url: _deployment + "S3QL.php",
            data: {
                query: query,
                key: _key,
                format: "json"
            },
            dataType: "jsonp",
            success: function (result) {
                if(_debug === true) {
                    console.info("S3QL Query", queryNumber, "Result:", result);
                }
                // Error handling.
                if(result.length === 0) {
                    // Empty result, call callback anyway.
                    callback(null, result);
                } else {
                    if(result[0].error_code === undefined || result[0].error_code == "0") {
                        // No errors found, call callback.
                        callback(null, result);
                    } else {
                        callback(new Error(result[0].message));
                    }
                }
            }
        });
    }