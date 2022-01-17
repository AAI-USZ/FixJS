function (code, error, httpCode) {
                if (!httpCode) {
                    httpCode = 200;
                }

                res.send(httpCode, encodeURIComponent(JSON.stringify({
                    code: Math.abs(code) * -1 || -1,
                    data: null,
                    msg: error
                })));
            }