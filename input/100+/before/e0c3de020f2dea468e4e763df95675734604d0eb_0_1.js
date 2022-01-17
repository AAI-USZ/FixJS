function (success, error) {
                var requestUri = composeUri(),
                    request = createXhrRequest(requestUri, false),
                    response, 
                    errored, 
                    cb, 
                    data;

                request.send(isPost ? paramString : null);

                response = JSON.parse(request.responseText || "null");
                errored = response.code < 0;
                cb = errored ? error : success;
                data = errored ? response.msg : response.data;

                if (cb) {
                    cb(data, response);
                }
                else if (errored) {
                    throw data;
                }

                return data;
            }