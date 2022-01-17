function(phantom) {
    /**
     * Main Casper class. Available options are:
     *
     * Name              | Type     | Default | Description
     * ——————————————————+——————————+—————————+————————————————————————————————————————————————————————————————————
     * clientScripts     | Array    | []      | A collection of script filepaths to include to every page loaded
     * logLevel          | String   | "error" | Logging level (see logLevels for available values)
     * onDie             | function | null    | A function to be called when Casper#die() is called
     * onPageInitialized | function | null    | A function to be called after WebPage instance has been initialized
     * page              | WebPage  | null    | An existing WebPage instance
     * pageSettings      | Object   | {}      | PhantomJS's WebPage settings object
     * verbose           | Boolean  | false   | Realtime output of log messages
     *
     * @param  Object  options  Casper options
     * @return Casper
     */
    phantom.Casper = function(options) {
        const DEFAULT_DIE_MESSAGE = "Suite explicitely interrupted without any message given.";
        const DEFAULT_USER_AGENT  = "Mozilla/5.0 (Windows NT 6.0) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.112 Safari/535.1";
        // init & checks
        if (!(this instanceof arguments.callee)) {
            return new Casper(options);
        }
        // default options
        this.defaults = {
            clientScripts:     [],
            logLevel:          "error",
            onDie:             null,
            onPageInitialized: null,
            page:              null,
            pageSettings:      { userAgent: DEFAULT_USER_AGENT },
            verbose:           false
        };
        // local properties
        this.checker = null;
        this.currentHTTPStatus = 200;
        this.loadInProgress = false;
        this.logLevels = ["debug", "info", "warning", "error"];
        this.options = mergeObjects(this.defaults, options);
        this.page = null;
        this.requestUrl = 'about:blank';
        this.result = {
            log:    [],
            status: "success",
            time:   0
        }
        this.started = false;
        this.step = 0;
        this.steps = [];
    };

    /**
     * Casper prototype
     */
    phantom.Casper.prototype = {
        /**
         * Encodes a resource using the base64 algorithm synchroneously using
         * client-side XMLHttpRequest.
         *
         * NOTE: we cannot use window.btoa() for some strange reasons here.
         *
         * @param  String  url  The url to download
         * @return string       Base64 encoded result
         */
        base64encode: function(url) {
            return result = this.evaluate(function() {
                return __utils__.getBase64('%url%');
            }, {
                url: url
            });
        },

        /**
         * Proxy method for WebPage#render. Adds a clipRect parameter for
         * automatically set page clipRect setting values and sets it back once
         * done.
         *
         * @param  String  targetFile  A target filename
         * @param  mixed   clipRect    An optional clipRect object
         * @return Casper
         */
        capture: function(targetFile, clipRect) {
            var previousClipRect = this.page.clipRect;
            if (clipRect) {
                this.page.clipRect = clipRect;
            }
            if (!this.page.render(targetFile)) {
                this.log('Failed to capture screenshot as ' + targetFile, "error");
            }
            this.page.clipRect = previousClipRect;
            return this;
        },

        /**
         * Captures the page area containing the provided selector.
         *
         * @param  String  targetFile  Target destination file path.
         * @param  String  selector    CSS3 selector
         * @return Casper
         */
        captureSelector: function(targetFile, selector) {
            return this.capture(targetFile, self.evaluate(function() {
                try {
                    return document.querySelector(selector).getBoundingClientRect();
                } catch (e) {
                    console.log('unable to fetch bounds for element ' + selector);
                }
            }));
        },

        /**
         * Checks for any further navigation step to process.
         *
         * @param  Casper    self        A self reference
         * @param  function  onComplete  An options callback to apply on completion
         */
        checkStep: function(self, onComplete) {
            var step = self.steps[self.step];
            if (!self.loadInProgress && typeof(step) === "function") {
                var curStepNum = self.step + 1
                ,   stepInfo   = "Step " + curStepNum + "/" + self.steps.length + ": ";
                self.log(stepInfo + self.page.evaluate(function() {
                    return document.location.href;
                }) + ' (HTTP ' + self.currentHTTPStatus + ')', "info");
                try {
                    step(self);
                } catch (e) {
                    self.log("Fatal: " + e, "error");
                }
                var time = new Date().getTime() - self.startTime;
                self.log(stepInfo + "done in " + time + "ms.", "info");
                self.step++;
            }
            if (typeof(step) !== "function") {
                self.result.time = new Date().getTime() - self.startTime;
                self.log("Done " + self.steps.length + " steps in " + self.result.time + 'ms.', "info");
                clearInterval(self.checker);
                if (typeof(onComplete) === "function") {
                    onComplete(self);
                } else {
                    // default behavior is to exit phantom
                    self.exit();
                }
            }
        },

        /**
         * Logs the HTML code of the current page.
         *
         * @return Casper
         */
        debugHTML: function() {
            this.echo(this.page.evaluate(function() {
                return document.body.innerHTML;
            }));
            return this;
        },

        /**
         * Logs the textual contents of the current page.
         *
         * @return Casper
         */
        debugPage: function() {
            this.echo(this.page.evaluate(function() {
                return document.body.innerText;
            }));
            return this;
        },

        /**
         * Exit phantom on failure, with a logged error message.
         *
         * @param  String  message  An optional error message
         * @param  Number  status   An optional exit status code (must be > 0)
         * @return Casper
         */
        die: function(message, status) {
            this.result.status = 'error';
            this.result.time = new Date().getTime() - this.startTime;
            message = typeof(message) === "string" && message.length > 0 ? message : DEFAULT_DIE_MESSAGE;
            this.log(message, "error");
            if (typeof(this.options.onDie) === "function") {
                this.options.onDie(this, message, status);
            }
            return this.exit(Number(status) > 0 ? Number(status) : 1);
        },

        /**
         * Prints something to stdout.
         *
         * @param  String  text  A string to echo to stdout
         * @return Casper
         */
        echo: function(text) {
            console.log(text);
            return this;
        },

        /**
         * Evaluates an expression in the page context, a bit like what
         * WebPage#evaluate does, but can also replace values by their
         * placeholer names:
         *
         *     casper.evaluate(function() {
         *         document.querySelector('#username').setAttribute('value', '%username%');
         *         document.querySelector('#password').setAttribute('value', '%password%');
         *         document.querySelector('#submit').click();
         *     }, {
         *         username: 'Bazoonga',
         *         password: 'baz00nga'
         *     })
         *
         * FIXME: waiting for a patch of PhantomJS to allow direct passing of
         * arguments to the function.
         * TODO: don't forget to keep this backward compatible.
         *
         * @param  function  fn            The function to be evaluated within current page DOM
         * @param  object    replacements  Optional replacements to performs, eg. for '%foo%' => {foo: 'bar'}
         * @return mixed
         * @see    WebPage#evaluate
         */
        evaluate: function(fn, replacements) {
            return this.page.evaluate(replaceFunctionPlaceholders(fn, replacements));
        },

        /**
         * Evaluates an expression within the current page DOM and die() if it
         * returns false.
         *
         * @param  function  fn       Expression to evaluate
         * @param  String    message  Error message to log
         * @return Casper
         */
        evaluateOrDie: function(fn, message) {
            if (!this.evaluate(fn)) {
                return this.die(message);
            }
            return this;
        },

        /**
         * Exits phantom.
         *
         * @param  Number  status  Status
         * @return Casper
         */
        exit: function(status) {
            phantom.exit(status);
            return this;
        },

        /**
         * Logs a message.
         *
         * @param  String  message  The message to log
         * @param  String  level    The log message level (from Casper.logLevels property)
         * @param  String  space    Space from where the logged event occured (default: "phantom")
         * @return Casper
         */
        log: function(message, level, space) {
            level = level && this.logLevels.indexOf(level) > -1 ? level : "debug";
            space = space ? space : "phantom";
            if (this.logLevels.indexOf(level) < this.logLevels.indexOf(this.options.logLevel)) {
                return this; // skip logging
            }
            if (this.options.verbose) {
                this.echo('[' + level + '] [' + space + '] ' + message); // direct output
            }
            this.result.log.push({
                level:   level,
                space:   space,
                message: message,
                date:    new Date().toString(),
            });
            return this;
        },

        /**
         * Opens a page. Takes only one argument, the url to open (using the
         * callback argument would defeat the whole purpose of Casper
         * actually).
         *
         * @param  String  location  The url to open
         * @return Casper
         */
        open: function(location) {
            this.requestUrl = location;
            this.page.open(location);
            return this;
        },

        /**
         * Repeats a step a given number of times.
         *
         * @param  Number    times  Number of times to repeat step
         * @aram   function  then   The step closure
         * @return Casper
         * @see    Casper#then
         */
        repeat: function(times, then) {
            for (var i = 0; i < times; i++) {
                this.then(then);
            }
            return this;
        },

        /**
         * Runs the whole suite of steps.
         *
         * @param  function  onComplete  an optional callback
         * @param  Number    time        an optional amount of milliseconds for interval checking
         * @return Casper
         */
        run: function(onComplete, time) {
            if (!this.steps || this.steps.length < 1) {
                this.log("No steps defined, aborting", "error");
                return this;
            }
            this.log("Running suite: " + this.steps.length + " step" + (this.steps.length > 1 ? "s" : ""), "info");
            this.checker = setInterval(this.checkStep, (time ? time: 250), this, onComplete);
            return this;
        },

        /**
         * Configures and starts Casper.
         *
         * @param  String   location  An optional location to open on start
         * @param  function then      Next step function to execute on page loaded (optional)
         * @return Casper
         */
        start: function(location, then) {
            if (this.started) {
                this.log("start failed: Casper has already started!", "error");
            }
            this.log('Starting…', "info");
            this.startTime = new Date().getTime();
            this.steps = [];
            this.step = 0;
            // Option checks
            if (this.logLevels.indexOf(this.options.logLevel) < 0) {
                this.log("Unknown log level '" + this.options.logLevel + "', defaulting to 'warning'", "warning");
                this.options.logLevel = "warning";
            }
            // WebPage
            if (!isWebPage(this.page)) {
                if (isWebPage(this.options.page)) {
                    this.page = this.options.page;
                } else {
                    this.page = createPage(this);
                }
            }
            this.page.settings = mergeObjects(this.page.settings, this.options.pageSettings);
            this.started = true;
            if (typeof(this.options.onPageInitialized) === "function") {
                this.log("Post-configuring WebPage instance", "debug");
                this.options.onPageInitialized(this.page);
            }
            if (typeof(location) === "string" && location.length > 0) {
                if (typeof(then) === "function") {
                    return this.open(location).then(then);
                } else {
                    return this.open(location);
                }
            }
            return this;
        },

        /**
         * Schedules the next step in the navigation process.
         *
         * @param  function  step  A function to be called as a step
         * @return Casper
         */
        then: function(step) {
            if (!this.started) {
                throw "Casper not started; please use Casper#start";
            }
            if (typeof(step) !== "function") {
                throw "You can only define a step as a function";
            }
            this.steps.push(step);
            return this;
        },

        /**
         * Adds a new navigation step to perform code evaluation within the
         * current retrieved page DOM.
         *
         * @param  function  fn            The function to be evaluated within current page DOM
         * @param  object    replacements  Optional replacements to performs, eg. for '%foo%' => {foo: 'bar'}
         * @return Casper
         * @see    Casper#evaluate
         */
        thenEvaluate: function(fn, replacements) {
            return this.then(function(self) {
                self.evaluate(fn, replacements);
            });
        },

        /**
         * Adds a new navigation step for opening the provided location.
         *
         * @param  String   location  The URL to load
         * @param  function then      Next step function to execute on page loaded (optional)
         * @return Casper
         * @see    Casper#open
         */
        thenOpen: function(location, then) {
            this.then(function(self) {
                self.open(location);
            });
            return typeof(then) === "function" ? this.then(then) : this;
        },

        /**
         * Adds a new navigation step for opening and evaluate an expression
         * against the DOM retrieved from the provided location.
         *
         * @param  String    location      The url to open
         * @param  function  fn            The function to be evaluated within current page DOM
         * @param  object    replacements  Optional replacements to performs, eg. for '%foo%' => {foo: 'bar'}
         * @return Casper
         * @see    Casper#evaluate
         * @see    Casper#open
         */
        thenOpenAndEvaluate: function(location, fn, replacements) {
            return this.thenOpen(location).thenEvaluate(fn, replacements);
        },
    };

    /**
     * Casper client-side helpers.
     */
    phantom.Casper.ClientUtils = function() {
        /**
         * Base64 encodes a string, even binary ones. Succeeds where
         * window.btoa() fails.
         *
         * @param  String  str
         * @return string
         */
        this.encode = function(str) {
            var CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var out = "", i = 0, len = str.length, c1, c2, c3;
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i == len) {
                    out += CHARS.charAt(c1 >> 2);
                    out += CHARS.charAt((c1 & 0x3) << 4);
                    out += "==";
                    break;
                }
                c2 = str.charCodeAt(i++);
                if (i == len) {
                    out += CHARS.charAt(c1 >> 2);
                    out += CHARS.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
                    out += CHARS.charAt((c2 & 0xF) << 2);
                    out += "=";
                    break;
                }
                c3 = str.charCodeAt(i++);
                out += CHARS.charAt(c1 >> 2);
                out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += CHARS.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                out += CHARS.charAt(c3 & 0x3F);
            }
            return out;
        };

        /**
         * Downloads a resource behind an url and returns its base64-encoded
         * contents.
         *
         * @param  String  url  The resource url
         * @return String       Base64 contents string
         */
        this.getBase64 = function(url) {
            return this.encode(this.getBinary(url));
        };

        /**
         * Retrieves string contents from a binary file behind an url.
         *
         * @param  String  url
         * @return string
         */
        this.getBinary = function(url) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
            xhr.send(null);
            return xhr.responseText;
        };
    };

    /**
     * Creates a new WebPage instance for Casper use.
     *
     * @param  Casper  casper  A Casper instance
     * @return WebPage
     */
    function createPage(casper) {
        var page;
        if (phantom.version.major <= 1 && phantom.version.minor < 3) {
            page = new WebPage();
        } else {
            page = require('webpage').create();
        }
        page.onConsoleMessage = function(msg) {
            casper.log(msg, "info", "remote");
        };
        page.onLoadStarted = function() {
            casper.loadInProgress = true;
        };
        page.onLoadFinished = function(status) {
            if (status !== "success") {
                casper.log('Loading resource failed with status=' + status + ': ' + casper.requestUrl, "info");
            }
            if (casper.options.clientScripts) {
                for (var i = 0; i < casper.options.clientScripts.length; i++) {
                    var script = casper.options.clientScripts[i];
                    if (casper.page.injectJs(script)) {
                        casper.log('Automatically injected ' + script + ' client side', "debug");
                    } else {
                        casper.log('Failed injecting ' + script + ' client side', "debug");
                    }
                }
            }
            // Client utils injection
            var injected = page.evaluate(replaceFunctionPlaceholders(function() {
                eval("var ClientUtils = " + decodeURIComponent("%utils%"));
                __utils__ = new ClientUtils();
                return __utils__ instanceof ClientUtils;
            }, {
                utils: encodeURIComponent(phantom.Casper.ClientUtils.toString())
            }));
            if (!injected) {
                casper.log('Failed to inject Casper client-side utilities!', "warning");
            } else {
                casper.log('Successfully injected Casper client-side utilities', "debug");
            }
            casper.loadInProgress = false;
        };
        page.onResourceReceived = function(resource) {
            if (resource.url === casper.requestUrl) {
                casper.currentHTTPStatus = resource.status;
            }
        };
        return page;
    }

    /**
     * Object recursive merging utility.
     *
     * @param  object  obj1  the destination object
     * @param  object  obj2  the source object
     * @return object
     */
    function mergeObjects(obj1, obj2) {
        for (var p in obj2) {
            try {
                if (obj2[p].constructor == Object) {
                    obj1[p] = mergeObjects(obj1[p], obj2[p]);
                } else {
                    obj1[p] = obj2[p];
                }
            } catch(e) {
              obj1[p] = obj2[p];
            }
        }
        return obj1;
    }

    /**
     * Replaces a function string contents with placeholders provided by an
     * Object.
     *
     * @param  function  fn            The function
     * @param  object    replacements  Object containing placeholder replacements
     * @return string                  A function string representation
     */
    function replaceFunctionPlaceholders(fn, replacements) {
        if (replacements && typeof replacements === "object") {
            fn = fn.toString();
            for (var p in replacements) {
                var match = '%' + p + '%';
                do {
                    fn = fn.replace(match, replacements[p]);
                } while(fn.indexOf(match) !== -1);
            }
        }
        return fn;
    }

    /**
     * Checks if the provided var is a WebPage instance
     *
     * @param  mixed  what
     * @return Boolean
     */
    function isWebPage(what) {
        if (!what || typeof(what) !== "object") {
            return false;
        }
        if (phantom.version.major <= 1 && phantom.version.minor < 3) {
            return what instanceof WebPage;
        } else {
            return what.indexOf('WebPage(') === 0;
        }
    }
}