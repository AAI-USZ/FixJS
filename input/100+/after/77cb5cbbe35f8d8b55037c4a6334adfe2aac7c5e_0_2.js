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