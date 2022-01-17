function(origin, method, m) {
                // if an observer was specified at allocation time, invoke it
                if (typeof cfg.gotMessageObserver === 'function') {
                    // pass observer a clone of the object so that our
                    // manipulations are not visible (i.e. method unscoping).
                    // This is not particularly efficient, but then we expect
                    // that message observers are primarily for debugging anyway.
                    try {
                        cfg.gotMessageObserver(origin, m);
                    } catch (e) {
                        debug("gotMessageObserver() raised an exception: " + e.toString());
                    }
                }

                // now, what type of message is this?
                if (m.id && method) {
                    // a request!  do we have a registered handler for this request?
                    if (regTbl[method]) {
                        var trans = createTransaction(m.id, origin, m.callbacks ? m.callbacks : [ ]);
                        inTbl[m.id] = { };
                        try {
                            // callback handling.  we'll magically create functions inside the parameter list for each
                            // callback
                            if (m.callbacks && s_isArray(m.callbacks) && m.callbacks.length > 0) {
                                for (var i = 0; i < m.callbacks.length; i++) {
                                    var path = m.callbacks[i];
                                    var obj = m.params;
                                    var pathItems = path.split('/');
                                    for (var j = 0; j < pathItems.length - 1; j++) {
                                        var cp = pathItems[j];
                                        if (typeof obj[cp] !== 'object') obj[cp] = { };
                                        obj = obj[cp];
                                    }
                                    obj[pathItems[pathItems.length - 1]] = (function() {
                                        var cbName = path;
                                        return function(params) {
                                            return trans.invoke(cbName, params);
                                        }
                                    })();
                                }
                            }
                            var resp = regTbl[method](trans, m.params);
                            if (!trans.delayReturn() && !trans.completed()) trans.complete(resp);
                        } catch(e) {
                            // automagic handling of exceptions:
                            var error = "runtime_error";
                            var message = null;
                            // * if it's a string then it gets an error code of 'runtime_error' and string is the message
                            if (typeof e === 'string') {
                                message = e;
                            } else if (typeof e === 'object') {
                                // either an array or an object
                                // * if it's an array of length two, then  array[0] is the code, array[1] is the error message
                                if (e && s_isArray(e) && e.length == 2) {
                                    error = e[0];
                                    message = e[1];
                                }
                                // * if it's an object then we'll look form error and message parameters
                                else if (typeof e.error === 'string') {
                                    error = e.error;
                                    if (!e.message) message = "";
                                    else if (typeof e.message === 'string') message = e.message;
                                    else e = e.message; // let the stringify/toString message give us a reasonable verbose error string
                                }
                            }

                            // message is *still* null, let's try harder
                            if (message === null) {
                                try {
                                    message = JSON.stringify(e);
                                    /* On MSIE8, this can result in 'out of memory', which
                                     * leaves message undefined. */
                                    if (typeof(message) == 'undefined')
                                      message = e.toString();
                                } catch (e2) {
                                    message = e.toString();
                                }
                            }

                            trans.error(error,message);
                        }
                    }
                } else if (m.id && m.callback) {
                    if (!outTbl[m.id] ||!outTbl[m.id].callbacks || !outTbl[m.id].callbacks[m.callback])
                    {
                        debug("ignoring invalid callback, id:"+m.id+ " (" + m.callback +")");
                    } else {
                        // XXX: what if client code raises an exception here?
                        outTbl[m.id].callbacks[m.callback](m.params);
                    }
                } else if (m.id) {
                    if (!outTbl[m.id]) {
                        debug("ignoring invalid response: " + m.id);
                    } else {
                        // XXX: what if client code raises an exception here?
                        if (m.error) {
                            (1,outTbl[m.id].error)(m.error, m.message);
                        } else {
                            if (m.result !== undefined) (1,outTbl[m.id].success)(m.result);
                            else (1,outTbl[m.id].success)();
                        }
                        delete outTbl[m.id];
                        delete s_transIds[m.id];
                    }
                } else if (method) {
                    // tis a notification.
                    if (regTbl[method]) {
                        // yep, there's a handler for that.
                        // transaction is null for notifications.
                        regTbl[method](null, m.params);
                        // if the client throws, we'll just let it bubble out
                        // what can we do?  Also, here we'll ignore return values
                    }
                }
            }