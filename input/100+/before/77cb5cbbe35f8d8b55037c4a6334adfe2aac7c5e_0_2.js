function () {

            // putting everything in 1 test so it runs faster
            it("should attach style sheets", function () {

                // attach style sheet
                runs(function () {
                    var promise = ExtensionUtils.loadStyleSheet(module, "ExtensionUtils-test-files/basic.css");
                    waitsForDone(promise, "loadStyleSheet: basic.css");
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

                // attach another style sheet in a sub-directory with space and high-ascii chars in name.
                // note that git choked on double-byte chars, so those were removed.
                runs(function () {
                    var promise = ExtensionUtils.loadStyleSheet(module, "ExtensionUtils-test-files/sub dir/third.css");
                    waitsForDone(promise, "loadStyleSheet: third.css");
                });

                runs(function () {
                    // HighASCII_été.css
                    var $projectTitle = testWindow.$("#project-title");
                    var fontVariant = $projectTitle.css("font-variant");
                    expect(fontVariant).toEqual("small-caps");
                });
            });
        }