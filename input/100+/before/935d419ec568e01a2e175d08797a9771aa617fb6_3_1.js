function () {
        it("throws error when rim:splash element does not contain src attribute", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["rim:splash"] = {};

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).toThrow(localize.translate("EXCEPTION_INVALID_SPLASH_SRC"));
        });

        it("throws error when rim:splash element contains empty src attribute", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["rim:splash"] = {
                "@": {
                    "src": ""
                }
            };

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).toThrow(localize.translate("EXCEPTION_INVALID_SPLASH_SRC"));
        });

        it("throws error when one of many rim:splash elements does not contain attribute", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["rim:splash"] = [{
                    "@": {
                        "src": "a.jpg"
                    }
                }, {
                    "#": "blah"
                }];

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).toThrow(localize.translate("EXCEPTION_INVALID_SPLASH_SRC"));
        });

        it("allow one rim:splash element that contains non-empty src attribute", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["rim:splash"] = {
                "@": {
                    "src": "a.jpg"
                }
            };

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).not.toThrow();
        });

        it("allow multiple rim:splash elements that contain non-empty src attribute", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["rim:splash"] = [{
                    "@": {
                        "src": "a.jpg"
                    }
                }, {
                    "@": {
                        "src": "b.jpg"
                    }
                }];

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).not.toThrow();
        });
    }