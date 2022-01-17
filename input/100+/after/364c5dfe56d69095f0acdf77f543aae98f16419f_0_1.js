function (promisesOrValues) {



                var toResolve, results, ret, deferred, resolver, rejecter, handleProgress, len, i;



                len = promisesOrValues.length >>> 0;



                toResolve = Math.max(0, Math.min(howMany, len));

                results = [];

                deferred = defer();

                ret = when(deferred, callback, errback, progressHandler);



                // Wrapper so that resolver can be replaced

                function resolve(val) {

                    resolver(val);

                }



                // Wrapper so that rejecter can be replaced

                function reject(err) {

                    rejecter(err);

                }



                // Wrapper so that progress can be replaced

                function progress(update) {

                    handleProgress(update);

                }



                function complete() {

                    resolver = rejecter = handleProgress = noop;

                }



                // No items in the input, resolve immediately

                if (!toResolve) {

                    deferred.resolve(results);



                } else {

                    // Resolver for promises.  Captures the value and resolves

                    // the returned promise when toResolve reaches zero.

                    // Overwrites resolver var with a noop once promise has

                    // be resolved to cover case where n < promises.length

                    resolver = function (val) {

                        // This orders the values based on promise resolution order

                        // Another strategy would be to use the original position of

                        // the corresponding promise.

                        results.push(val);



                        if (! --toResolve) {

                            complete();

                            deferred.resolve(results);

                        }

                    };



                    // Rejecter for promises.  Rejects returned promise

                    // immediately, and overwrites rejecter var with a noop

                    // once promise to cover case where n < promises.length.

                    // TODO: Consider rejecting only when N (or promises.length - N?)

                    // promises have been rejected instead of only one?

                    rejecter = function (err) {

                        complete();

                        deferred.reject(err);

                    };



                    handleProgress = deferred.progress;



                    // TODO: Replace while with forEach

                    for (i = 0; i < len; ++i) {

                        if (i in promisesOrValues) {

                            when(promisesOrValues[i], resolve, reject, progress);

                        }

                    }

                }



                return ret;

            }