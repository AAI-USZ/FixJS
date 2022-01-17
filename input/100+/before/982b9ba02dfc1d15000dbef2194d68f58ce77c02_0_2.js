function (result) {
                if(_debug === true) {
                    console.info("SPARQL Query", queryNumber, "Result:", result);
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