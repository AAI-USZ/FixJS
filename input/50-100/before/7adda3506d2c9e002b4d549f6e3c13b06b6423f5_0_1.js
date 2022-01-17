function(err, data) {
                    if (err) {
                        callback(err);
                        return;
                    }

                    // Merge the inputs from right to left (right most values
                    // win)
                    base = my.merge(app, data, instance);

                    // Ensure the "instance" has been properly resolved. If
                    // there are no specs in the application.json file, there is
                    // an error below because the instance is invalid. We should
                    // check here for a valid instance object and throw an error
                    // if it is not. This happens because someone could create a
                    // routes.json file with routes that don't route to mojit
                    // instances, and the URI router creates invalid commands,
                    // which are passed into the dispatch.
                    if (!my.validate(base)) {
                        callback({
                            message: 'Instance was not valid.',
                            stack: JSON.stringify(base, null, 4)
                        });
                        return;
                    }

                    // Add the final "base" to the cache
                    my.cache(env, instance, context, base);

                    callback(null, base);
                }