function () {
                    if (request.readyState === 4 && request.status === 200) {
                        var response = JSON.parse(request.responseText || "null"),
                        cb = response.code < 0 ? error : success,
                        data = response.code < 0 ? response.msg : response.data;

                        return cb && cb(data, response);
                    }
                }