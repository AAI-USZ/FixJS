function decorateNewPage(opts, page) {
    var handlers = {};

    try {
        page.rawPageCreated.connect(function(newPage) {
            // Decorate the new raw page appropriately
            newPage = decorateNewPage(opts, newPage);

            // Notify via callback, if a callback was provided
            if (page.onPageCreated && typeof(page.onPageCreated) === "function") {
                page.onPageCreated(newPage);
            }
        });
    } catch (e) {}

    // deep copy
    page.settings = JSON.parse(JSON.stringify(phantom.defaultPageSettings));

    definePageSignalSetter(page, handlers, "onInitialized", "initialized");

    definePageSignalSetter(page, handlers, "onLoadStarted", "loadStarted");

    definePageSignalSetter(page, handlers, "onLoadFinished", "loadFinished");

    definePageSignalSetter(page, handlers, "onUrlChanged", "urlChanged");

    definePageSignalSetter(page, handlers, "onNavigationRequested", "navigationRequested");

    definePageSignalSetter(page, handlers, "onResourceRequested", "resourceRequested");

    definePageSignalSetter(page, handlers, "onResourceReceived", "resourceReceived");

    definePageSignalSetter(page, handlers, "onAlert", "javaScriptAlertSent");

    definePageSignalSetter(page, handlers, "onConsoleMessage", "javaScriptConsoleMessageSent");

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

    /**
     * Include an external JavaScript file and notify when done.
     * @param scriptUrl URL to the Script to include
     * @param onScriptLoaded If provided, this call back is executed when the inclusion is done
     */
    page.includeJs = function (scriptUrl, onScriptLoaded) {
        // Register temporary signal handler for 'alert()'
        this.javaScriptAlertSent.connect(function (msgFromAlert) {
            if (msgFromAlert === scriptUrl) {
                // Resource loaded, time to fire the callback (if any)
                if (onScriptLoaded && typeof(onScriptLoaded) === "function") {
                    onScriptLoaded(scriptUrl);
                }
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

    /**
     * get cookies of the page
     */
    page.__defineGetter__("cookies", function() {
        return this.cookies;
    });

    /**
     * set cookies of the page
     * @param []{...} cookies an array of cookies object with arguments in mozilla cookie format
     *        cookies[0] = {
     *            'name' => 'Cookie-Name',
     *            'value' => 'Cookie-Value',
     *            'domain' => 'foo.com',
     *            'path' => 'Cookie-Path',
     *            'expires' => 'Cookie-Expiration-Date',
     *            'httponly' => true | false,
     *            'secure' => true | false
     *        };
     */
    page.__defineSetter__("cookies", function(cookies) {
        this.setCookies(cookies);
    });

    // Copy options into page
    if (opts) {
        page = copyInto(page, opts);
    }

    // Calls from within the page to "phantomCallback()" arrive to this handler
    definePageCallbackSetter(page, "onCallback", "_getGenericCallback");

    // Calls from within the page to "window.confirm(message)" arrive to this handler
    // @see https://developer.mozilla.org/en/DOM/window.confirm
    definePageCallbackSetter(page, "onConfirm", "_getJsConfirmCallback");

    // Calls from within the page to "window.prompt(message, defaultValue)" arrive to this handler
    // @see https://developer.mozilla.org/en/DOM/window.prompt
    definePageCallbackSetter(page, "onPrompt", "_getJsPromptCallback");

    return page;
}