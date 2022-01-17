function () {
                    var promise = ExtensionUtils.loadStyleSheet(module, "ExtensionUtils-test-files/sub dir/third.css");
                    waitsForDone(promise, "loadStyleSheet: third.css");
                }