function (err) {
                    var queryNumber;
                    if (err !== null) {
                        callback(err);
                    } else {
                        if(_debug === true) {
                            _queryCounter++;
                            queryNumber = _queryCounter;
                            console.info("SPARQL Query", queryNumber, ":", query);
                        }
                        $.ajax({
                            url: _deployment + "sparql.php",
                            data: {
                                query: query,
                                key: _key,
                                clean: fromCache,
                                format: "json"
                            },
                            dataType: "jsonp",
                            success: function (result) {
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
                        });
                    }
                }