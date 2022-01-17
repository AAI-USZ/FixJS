function(location, then) {
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
            if (!(this.page instanceof WebPage)) {
                if (this.options.page instanceof WebPage) {
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
        }