function(_requests, _callback, _cache, _forcePOST, _async) {
            var method = _forcePOST === true ? "POST" : "GET";
            var cache = _cache === false ? false : true;
            var async = _async === false ? false : true;
            var url = sakai_conf.URL.BATCH;

            // Append a charset to each request
            $.each(_requests, function(i,req) {
                if (!req["_charset_"]) {
                    req["_charset_"] = "utf-8";
                }
                if (req["parameters"] && !req["parameters"].hasOwnProperty("_charset_")) {
                    req["parameters"]["_charset_"] = "utf-8";
                }
            });
            // Don't submit a request when the batch is empty
            if (_requests.length === 0) {
                if ($.isFunction(_callback)) {
                    _callback(true, {"results": []});
                }
            }
            // Don't issue a batch request for a single, cacheable request
            else if (_requests.length === 1) {
                $.ajax({
                    url: _requests[0].url,
                    type: _requests[0].method || "GET",
                    dataType: "text",
                    data: _requests[0].parameters || "",
                    success: function(data) {
                        var retObj = {
                            "results": [
                                {
                                    "url": _requests[0].url,
                                    "success": true,
                                    "body": data
                                }
                            ]
                        };
                        if ($.isFunction(_callback)) {
                            _callback(true, retObj);
                        }
                    },
                    error: function(status){
                        if ($.isFunction(_callback)) {
                            _callback(false, {"results": [{
                                "url": _requests[0].url,
                                "success": false,
                                "body": "{}"
                            }]});
                        }
                    }
                });

            } else {

                // if any request contains a POST, we should be POSTing so the request isn't cached
                // maybe just GET with no cache? not sure
                for (var i=0; i<_requests.length; i++) {
                    if (_requests[i].method === "POST") {
                        method = "POST";
                        break;
                    }
                }
                $.ajax({
                    url: sakai_conf.URL.BATCH,
                    type: method,
                    cache: cache,
                    async: async,
                    data: {
                        "_charset_":"utf-8",
                        requests: JSON.stringify(_requests)
                    },
                    success: function(data) {
                        if ($.isFunction(_callback)) {
                            _callback(true, data);
                        }
                    },
                    error: function(xhr) {
                        if ($.isFunction(_callback)) {
                            _callback(false);
                        }
                    }
                });
            }
        }