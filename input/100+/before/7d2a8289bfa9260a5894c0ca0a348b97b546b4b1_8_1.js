function (require, exports, module) {
    'use strict';

    var ExtensionUtils,
        SpecRunnerUtils     = require("./SpecRunnerUtils.js");


    describe("Extension Utils", function () {

        var testWindow;

        beforeEach(function () {
            SpecRunnerUtils.createTestWindowAndRun(this, function (w) {
                testWindow = w;

                // Load module instances from brackets.test
                ExtensionUtils      = testWindow.brackets.test.ExtensionUtils;
            });
        });

        afterEach(function () {
            SpecRunnerUtils.closeTestWindow();
        });

        describe("loadStyleSheet", function () {

            function loadStyleSheet(doc, path) {

                var styleSheetsCount, lastStyleSheetIndex;

                expect(doc).toBeTruthy();
                expect(doc.styleSheets).toBeTruthy();

                // attach style sheet
                runs(function () {
                    styleSheetsCount = doc.styleSheets.length;
                    var promise = ExtensionUtils.loadStyleSheet(module, path);
                    waitsForDone(promise, "loadStyleSheet: " + path);
                });

                // even though promise has resolved, stylesheet may still not be loaded,
                // so wait until styleSheets array length has been incremented.
                waitsFor(function () {
                    return (doc.styleSheets.length > styleSheetsCount);
                }, "loadStyleSheet() increments array timeout", 1000);

                // after styleSheets array is incremented, wait for cssRules object to be defined.
                // note that this works for Chrome, but not sure about other browsers.
                // someday there may be an event to listen for...
                runs(function () {
                    lastStyleSheetIndex = doc.styleSheets.length - 1;
                });
                waitsFor(function () {
                    return (doc.styleSheets[lastStyleSheetIndex].cssRules);
                }, "loadStyleSheet() cssRules defined timeout", 1000);
            }

            // putting everything in 1 test so it runs faster
            it("should attach style sheets", function () {

                runs(function () {
                    loadStyleSheet(testWindow.document, "ExtensionUtils-test-files/basic.css");
                });

                // placing this code in a separate closure forces styles to update
                runs(function () {
                    // basic.css
                    var $projectTitle = testWindow.$("#project-title");
                    var fontSize = $projectTitle.css("font-size");
                    expect(fontSize).toEqual("25px");

                    // second.css is imported in basic.css
                    var fontWeight = $projectTitle.css("font-weight");
                    expect(fontWeight).toEqual("500");
                });

                // attach another style sheet in a sub-directory with space in name.
                runs(function () {
                    loadStyleSheet(testWindow.document, "ExtensionUtils-test-files/sub dir/third.css");
                });

                runs(function () {
                    // third.css
                    var $projectTitle = testWindow.$("#project-title");
                    var fontVariant = $projectTitle.css("font-variant");
                    expect(fontVariant).toEqual("small-caps");
                });
            });
        });
    });
}