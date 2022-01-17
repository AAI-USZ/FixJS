function (err, req2, res, data) {
                var obj;
                try {
                        if (data) {
                                obj = JSON.parse(data);
                        } else {
                                obj = {};
                        }
                } catch (e) {
                        return (callback(e, req2, res, null));
                }

                if (res && res.statusCode >= 400) {
                        // Upcast error to a RestError (if we can)
                        // Be nice and handle errors like
                        // { error: { code: '', message: '' } }
                        // in addition to { code: '', message: '' }.
                        if (obj.code || (obj.error && obj.error.code)) {
                                err = new RestError({
                                        message: (obj.message ||
                                                  obj.error.message),
                                        restCode: obj.code || obj.error.code,
                                        statusCode: res.statusCode
                                });
                        } else if (!err) {
                                err = codeToHttpError(res.statusCode,
                                                      obj.message || '', data);
                        }
                }

                if (err)
                        err.body = obj;

                return (callback((err || null), req2, res, obj));
        }