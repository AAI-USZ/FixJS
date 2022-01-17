function any(promisesOrValues, callback, errback, progressHandler) {



            function unwrapSingleResult(val) {

                return callback ? callback(val[0]) : val[0];

            }



            return some(promisesOrValues, 1, unwrapSingleResult, errback, progressHandler);

        }