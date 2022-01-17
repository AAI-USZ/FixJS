function resultsUI(aCache) {
        let domWindow = this.dock.getCurrentTabWindow();
        let tests = {};

        if (aCache) {
            tests = aCache.tests;

            require("tools/debug").debug("Results from cache for " + domWindow.location);
        } else {
            let requests = RequestCache.getEntry(domWindow);
            try {
                tests = launchTests(domWindow, requests);
            } catch(e) {
                console.exception(e);
            }

            ResultStore.setEntry(domWindow.location.href, {
                "tests": tests,
                "checklists": this.iframe.contentWindow.wrappedJSObject.checklists
            });

            require("tools/debug").debug("Analyze done on " + domWindow.location);
        }

        let load = function() {
            this.iframe.removeEventListener("DOMContentLoaded", load, false);

            let win = this.iframe.contentWindow.wrappedJSObject;
            win.console = console;
            win._ = _;
            win._inspectElement = this.inspectElement.bind(this);
            win._testFeedback = this.testFeedback.bind(this);
            win._showInfo = this.showInfo.bind(this);

            win.showResults(tests, prefs);
            this.enableControls();
        }.bind(this);

        this.iframe.addEventListener("DOMContentLoaded", load, false);
        this.iframe.setAttribute("src", self.data.url("ui/results.html"));
    }