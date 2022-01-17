function (opts) {
    var page = phantom.createWebPage(),
        handlers = {};

    function checkType(o, type) {
        return typeof o === type;
    }

    function isObject(o) {
        return checkType(o, 'object');
    }

    function isUndefined(o) {
        return checkType(o, 'undefined');
    }

    function isUndefinedOrNull(o) {
        return isUndefined(o) || null === o;
    }

    function copyInto(target, source) {
        if (target === source || isUndefinedOrNull(source)) {
            return target;
        }

        target = target || {};

        // Copy into objects only
        if (isObject(target)) {
            // Make sure source exists
            source = source || {};

            if (isObject(source)) {
                var i, newTarget, newSource;
                for (i in source) {
                    if (source.hasOwnProperty(i)) {
                        newTarget = target[i];
                        newSource = source[i];

                        if (newTarget && isObject(newSource)) {
                            // Deep copy
                            newTarget = copyInto(target[i], newSource);
                        } else {
                            newTarget = newSource;
                        }

                        if (!isUndefined(newTarget)) {
                            target[i] = newTarget;
                        }
                    }
                }
            } else {
                target = source;
            }
        }

        return target;
    }

    function defineSetter(handlerName, signalName) {
        page.__defineSetter__(handlerName, function (f) {
            if (handlers && typeof handlers[signalName] === 'function') {
                try {
                    this[signalName].disconnect(handlers[signalName]);
                } catch (e) {}
            }

            handlers[signalName] = f;

            if (typeof f === 'function') {
                this[signalName].connect(f);
            }
        });
    }

    // deep copy
    page.settings = JSON.parse(JSON.stringify(phantom.defaultPageSettings));

    defineSetter("onInitialized", "initialized");

    defineSetter("onLoadStarted", "loadStarted");

    defineSetter("onLoadFinished", "loadFinished");

    defineSetter("onResourceRequested", "resourceRequested");

    defineSetter("onResourceReceived", "resourceReceived");

    defineSetter("onAlert", "javaScriptAlertSent");

    defineSetter("onConsoleMessage", "javaScriptConsoleMessageSent");

    phantom.__defineErrorSetter__(page, page);

    page.onError = phantom.defaultErrorHandler;

    page.open = function (url, arg1, arg2, arg3, arg4) {
        if (arguments.length === 1) {
            this.openUrl(url, 'get', this.settings);
            return;
        }
        if (arguments.length === 2 && typeof arg1 === 'function') {
            this.onLoadFinished = arg1;
            this.openUrl(url, 'get', this.settings);
            return;
        } else if (arguments.length === 2) {
            this.openUrl(url, arg1, this.settings);
            return;
        } else if (arguments.length === 3 && typeof arg2 === 'function') {
            this.onLoadFinished = arg2;
            this.openUrl(url, arg1, this.settings);
            return;
        } else if (arguments.length === 3) {
            this.openUrl(url, {
                operation: arg1,
                data: arg2
            }, this.settings);
            return;
        } else if (arguments.length === 4) {
            this.onLoadFinished = arg3;
            this.openUrl(url, {
                operation: arg1,
                data: arg2
            }, this.settings);
            return;
        } else if (arguments.length === 5) {
            this.onLoadFinished = arg4;
            this.openUrl(url, {
                operation: arg1,
                data: arg2,
                headers : arg3
            }, this.settings);
            return;
        }
        throw "Wrong use of WebPage#open";
    };

    page.includeJs = function (scriptUrl, onScriptLoaded) {
        // Register temporary signal handler for 'alert()'
        this.javaScriptAlertSent.connect(function (msgFromAlert) {
            if (msgFromAlert === scriptUrl) {
                // Resource loaded, time to fire the callback
                onScriptLoaded(scriptUrl);
                // And disconnect the signal handler
                try {
                    this.javaScriptAlertSent.disconnect(arguments.callee);
                } catch (e) {}
            }
        });

        // Append the script tag to the body
        this._appendScriptElement(scriptUrl);
    };

    /**
     * evaluate a function in the page
     * @param   {function}  func    the function to evaluate
     * @param   {...}       args    function arguments
     * @return  {*}                 the function call result
     */
    page.evaluate = function (func, args) {
        var str, arg, i, l;
        if (!(func instanceof Function || typeof func === 'string' || func instanceof String)) {
            throw "Wrong use of WebPage#evaluate";
        }
        str = 'function() { return (' + func.toString() + ')(';
        for (i = 1, l = arguments.length; i < l; i++) {
            arg = arguments[i];
            if (/object|string/.test(typeof arg) && !(arg instanceof RegExp)) {
                str += 'JSON.parse(' + JSON.stringify(JSON.stringify(arg)) + '),';
            } else {
                str += arg + ',';
            }
        }
        str = str.replace(/,$/, '') + '); }';
        return this.evaluateJavaScript(str);
    };

    /**
     * evaluate a function in the page, asynchronously
     * NOTE: it won't return anything: the execution is asynchronous respect to the call.
     * NOTE: the execution stack starts from within the page object
     * @param   {function}  func    the function to evaluate
     * @param   {number}    timeMs  time to wait before execution
     * @param   {...}       args    function arguments
     */
    page.evaluateAsync = function (func, timeMs, args) {
        var args = Array.prototype.splice.call(arguments, 0);

        if (!(func instanceof Function || typeof func === 'string' || func instanceof String)) {
            throw "Wrong use of WebPage#evaluateAsync";
        }
        // Wrapping the "func" argument into a setTimeout
        args.splice(0, 0, "function() { setTimeout(" + func.toString() + ", " + timeMs + "); }");

        this.evaluate.apply(this, args);
    };

    // Copy options into page
    if (opts) {
        page = copyInto(page, opts);
    }

    function defineSetterCallback(handlerName, callbackConstructor) {
        page.__defineSetter__(handlerName, function(f) {
            var callbackObj = page[callbackConstructor]();

            callbackObj.called.connect(function() {
                // Callback will receive a "deserialized", normal "arguments" array
                callbackObj.returnValue = f.apply(this, arguments[0]);
            });
        });
    }

    // Calls from within the page to "phantomCallback()" arrive to this handler
    defineSetterCallback("onCallback", "_getGenericCallback");

    // Calls from within the page to "window.confirm(message)" arrive to this handler
    // @see https://developer.mozilla.org/en/DOM/window.confirm
    defineSetterCallback("onConfirm", "_getJsConfirmCallback");

    // Calls from within the page to "window.prompt(message, defaultValue)" arrive to this handler
    // @see https://developer.mozilla.org/en/DOM/window.prompt
    defineSetterCallback("onPrompt", "_getJsPromptCallback");

    return page;
}