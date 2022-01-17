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