function (code, error, httpCode) {
                if (!httpCode) {
                    httpCode = 200;
                }

                res.send(httpCode, {
                    code: Math.abs(code) * -1 || -1,
                    data: null,
                    msg: error
                });
            }