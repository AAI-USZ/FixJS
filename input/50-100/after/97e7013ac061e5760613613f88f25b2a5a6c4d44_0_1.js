function () {
                result = response.parseResponse(timings, reqStart, args, res, bufs);
                putInCache(key, cache, result, res, expires);
                response.exec(timings, reqStart, args, uniqueId, res, start, result, options);
            }