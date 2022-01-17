function() {
    var page = new WebPage();

    it("should be creatable", function() {
        expect(typeof page).toEqual('object');
        expect(page).toNotEqual(null);
    });

    checkClipRect(page, {height:0,left:0,top:0,width:0});

    expectHasPropertyString(page, 'content');
    expectHasPropertyString(page, 'plainText');

    expectHasPropertyString(page, 'libraryPath');
    expectHasPropertyString(page, 'offlineStoragePath');
    expectHasProperty(page, 'offlineStorageQuota');

    it("should have objectName as 'WebPage'", function() {
        expect(page.objectName).toEqual('WebPage');
    });

    expectHasProperty(page, 'paperSize');
    it("should have paperSize as an empty object", function() {
            expect(page.paperSize).toEqual({});
    });

    checkScrollPosition(page, {left:0,top:0});

    expectHasProperty(page, 'settings');
    it("should have non-empty settings", function() {
        expect(page.settings).toNotEqual(null);
        expect(page.settings).toNotEqual({});
    });

    expectHasProperty(page, 'customHeaders');
    it("should have customHeaders as an empty object", function() {
            expect(page.customHeaders).toEqual({});
    });

    checkViewportSize(page, {height:300,width:400});

    expectHasFunction(page, 'deleteLater');
    expectHasFunction(page, 'destroyed');
    expectHasFunction(page, 'evaluate');
    expectHasFunction(page, 'initialized');
    expectHasFunction(page, 'injectJs');
    expectHasFunction(page, 'javaScriptAlertSent');
    expectHasFunction(page, 'javaScriptConsoleMessageSent');
    expectHasFunction(page, 'loadFinished');
    expectHasFunction(page, 'loadStarted');
    expectHasFunction(page, 'openUrl');
    expectHasFunction(page, 'release');
    expectHasFunction(page, 'render');
    expectHasFunction(page, 'resourceReceived');
    expectHasFunction(page, 'resourceRequested');
    expectHasFunction(page, 'uploadFile');

    expectHasFunction(page, 'sendEvent');

    it("should handle mousedown event", function() {
        runs(function() {
            page.evaluate(function() {
                window.addEventListener('mousedown', function(event) {
                    window.loggedEvent = window.loggedEvent || {};
                    window.loggedEvent.mousedown = event;
                }, false);
            });
            page.sendEvent('mousedown', 42, 217);
        });

        waits(50);

        runs(function() {
            var event = page.evaluate(function() {
                return window.loggedEvent.mousedown;
            });
            expect(event.clientX).toEqual(42);
            expect(event.clientY).toEqual(217);
        });
    });

    it("should handle mouseup event", function() {
        runs(function() {
            page.evaluate(function() {
                window.addEventListener('mouseup', function(event) {
                    window.loggedEvent = window.loggedEvent || {};
                    window.loggedEvent.mouseup = event;
                }, false);
            });
            page.sendEvent('mouseup', 14, 3);
        });

        waits(50);

        runs(function() {
            var event = page.evaluate(function() {
                return window.loggedEvent.mouseup;
            });
            expect(event.clientX).toEqual(14);
            expect(event.clientY).toEqual(3);
        });
    });

    it("should handle mousemove event", function() {
        runs(function() {
            page.evaluate(function() {
                window.addEventListener('mousemove', function(event) {
                    window.loggedEvent = window.loggedEvent || {};
                    window.loggedEvent.mousemove = event;
                }, false);
            });
            page.sendEvent('mousemove', 14, 7);
        });

        waits(50);

        runs(function() {
            var event = page.evaluate(function() {
                return window.loggedEvent.mousemove;
            });
            expect(event.clientX).toEqual(14);
            expect(event.clientY).toEqual(7);
        });
    });


    it("should handle click event", function() {
        runs(function() {
            page.evaluate(function() {
                window.addEventListener('mousedown', function(event) {
                    window.loggedEvent = window.loggedEvent || {};
                    window.loggedEvent.mousedown = event;
                }, false);
                window.addEventListener('mouseup', function(event) {
                    window.loggedEvent = window.loggedEvent || {};
                    window.loggedEvent.mouseup = event;
                }, false);
            });
            page.sendEvent('click', 42, 217);
        });

        waits(50);

        runs(function() {
            var event = page.evaluate(function() {
                return window.loggedEvent;
            });
            expect(event.mouseup.clientX).toEqual(42);
            expect(event.mouseup.clientY).toEqual(217);
            expect(event.mousedown.clientX).toEqual(42);
            expect(event.mousedown.clientY).toEqual(217);
        });
    });


    it("should handle file uploads", function() {
        runs(function() {
            page.content = '<input type="file" id="file">';
            page.uploadFile("#file", 'README.md');
        });

        waits(50);

        runs(function() {
            var fileName = page.evaluate(function() {
                return document.getElementById('file').files[0].fileName;
            });
            expect(fileName).toEqual('README.md');
        });
    });

    it("should support console.log with multiple arguments", function() {
        var message;
        runs(function() {
            page.onConsoleMessage = function (msg) {
                message = msg;
            }
        });

        waits(50);

        runs(function() {
            page.evaluate(function () {console.log('answer', 42)});
            expect(message).toEqual("answer 42");
        });
    });

    it("should not load any NPAPI plugins (e.g. Flash)", function() {
        runs(function() {
            expect(page.evaluate(function () { return window.navigator.plugins.length })).toEqual(0);
        });
    });

    it("reports unhandled errors", function() {
        var lastError = null;

        page = new require('webpage').create();
        page.onError = function(e) { lastError = e };

        runs(function() {
            page.evaluate(function() {
                setTimeout(function() { referenceError }, 0)
            });
        });

        waits(0);

        runs(function() {
            expect(lastError.toString()).toEqual("ReferenceError: Can't find variable: referenceError");

            page.evaluate(function() { referenceError2 });
            expect(lastError.toString()).toEqual("ReferenceError: Can't find variable: referenceError2");

            page.evaluate(function() { throw "foo" });
            expect(lastError).toEqual("foo");

            page.evaluate(function() { throw Error("foo") });
            expect(lastError.toString()).toEqual("Error: foo");
        });
    })

    it("doesn't report handled errors", function() {
        var hadError    = false;
        var caughtError = false;

        page = new require('webpage').create();

        runs(function() {
            page.onError = function() { hadError = true };
            page.evaluate(function() {
                caughtError = false;

                try {
                    referenceError
                } catch(e) {
                    caughtError = true;
                }
            });

            expect(hadError).toEqual(false);
            expect(page.evaluate(function() { return caughtError })).toEqual(true);
        });
    })

    it("reports the sourceURL and line of errors", function() {
        runs(function() {
            var e1, e2;

            try {
                referenceError
            } catch (e) {
                e1 = e
            };

            try {
                referenceError
            } catch (e) {
                e2 = e
            };

            expect(e1.sourceURL).toMatch(/webpage-spec.js$/);
            expect(e1.line).toBeGreaterThan(1);
            expect(e2.line).toEqual(e1.line + 6);
        });
    });

    it("reports the stack of errors", function() {
        var helperFile = "./fixtures/error-helper.js";
        phantom.injectJs(helperFile);

        runs(function() {
            function test() {
                ErrorHelper.foo()
            };

            var err;
            try {
                test()
            } catch (e) {
                err = e
            };

            var frame;

            frame = err.stack[0];
            expect(frame.sourceURL).toEqual(helperFile);
            expect(frame.line).toEqual(7);
            expect(frame.function).toEqual("bar");

            frame = err.stack[1];
            expect(frame.sourceURL).toEqual(helperFile);
            expect(frame.line).toEqual(3);
            expect(frame.function).toEqual("foo");

            frame = err.stack[2];
            expect(frame.sourceURL).toMatch(/webpage-spec.js$/);
            expect(frame.function).toEqual("test");
        });
    });

    it("reports errors that occur in the main context", function() {
        var error;
        phantom.onError = function(e) { error = e };

        runs(function() {
            setTimeout(function() { zomg }, 0);
        });

        waits(0);

        runs(function() {
            expect(error.toString()).toEqual("ReferenceError: Can't find variable: zomg");
            phantom.onError = phantom.defaultErrorHandler;
        });
    });

    it("should set custom headers properly", function() {
        var server = require('webserver').create();
        server.listen(12345, function(request, response) {
            // echo received request headers in response body
            response.write(JSON.stringify(request.headers));
            response.close();
        });

        var url = "http://localhost:12345/foo/headers.txt?ab=cd";
        var customHeaders = {
            "Custom-Key" : "Custom-Value",
            "User-Agent" : "Overriden-UA",
            "Referer" : "Overriden-Referer",
        };
        page.customHeaders = customHeaders;

        var handled = false;
        runs(function() {
            expect(handled).toEqual(false);
            page.open(url, function (status) {
                expect(status == 'success').toEqual(true);
                handled = true;

                var echoedHeaders = JSON.parse(page.plainText);
                // console.log(JSON.stringify(echoedHeaders, null, 4));
                // console.log(JSON.stringify(customHeaders, null, 4));

                expect(echoedHeaders["Custom-Key"]).toEqual(customHeaders["Custom-Key"]);
                expect(echoedHeaders["User-Agent"]).toEqual(customHeaders["User-Agent"]);
                expect(echoedHeaders["Referer"]).toEqual(customHeaders["Referer"]);

            });
        });

        waits(50);

        runs(function() {
            expect(handled).toEqual(true);
            server.close();
        });

    });

    it("should pass variables to functions properly", function() {
        var testPrimitiveArgs = function() {
            var samples = [
                true,
                0,
                "`~!@#$%^&*()_+-=[]\{}|;':\",./<>?",
                undefined,
                null
            ];
            for (var i = 0; i < samples.length; i++) {
                if (samples[i] !== arguments[i]) {
                    console.log("FAIL");
                }
            }
        };

        var testComplexArgs = function() {
            var samples = [
                {a:true, b:0, c:"string"},
                function() { return true; },
                [true, 0, "string"],
                /\d+\w*\//
            ];
            for (var i = 0; i < samples.length; i++) {
                if (typeof samples[i] !== typeof arguments[i] 
                    || samples[i].toString() !== arguments[i].toString()) {
                    console.log("FAIL");
                }
            }
        };

        var message;
        runs(function() {
            page.onConsoleMessage = function (msg) {
                message = msg;
            }
        });

        waits(0);

        runs(function() {
            page.evaluate(function() { 
                console.log("PASS");
            });
            page.evaluate(testPrimitiveArgs, 
                true,
                0,
                "`~!@#$%^&*()_+-=[]\{}|;':\",./<>?",
                undefined,
                null);
            page.evaluate(testComplexArgs,
                {a:true, b:0, c:"string"},
                function() { return true; },
                [true, 0, "string"],
                /\d+\w*\//);
            expect(message).toEqual("PASS");
        });
    });
}