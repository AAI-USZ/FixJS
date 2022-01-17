function () {
        it("throws error when icon element does not contain src attribute", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["icon"] = {};

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).toThrow(localize.translate("EXCEPTION_INVALID_ICON_SRC"));
        });

        it("throws error when icon element contains empty src attribute", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["icon"] = {
                "@": {
                    "src": ""
                }
            };

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).toThrow(localize.translate("EXCEPTION_INVALID_ICON_SRC"));
        });

        it("throws error when one of many icon elements does not contain attribute", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["icon"] = [{
                    "@": {
                        "src": "a.jpg"
                    }
                }, {
                    "#": "blah"
                }];

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).toThrow(localize.translate("EXCEPTION_INVALID_ICON_SRC"));
        });

        it("allow one icon element that contains non-empty src attribute", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["icon"] = {
                "@": {
                    "src": "a.jpg"
                }
            };

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).not.toThrow();
        });

        it("allow multiple icon elements that contain non-empty src attribute", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["icon"] = [{
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