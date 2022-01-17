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

        it("throws error when icon src starts with 'locales' subfolder", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["icon"] = [{
                    "@": {
                        "src": "a.jpg"
                    }
                }, {
                    "@": {
                        "src": "locales/en/b.jpg"
                    }
                }];

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).toThrow(localize.translate("EXCEPTION_INVALID_ICON_SRC_LOCALES"));
        });

        it("should copy the default icon to the src dir when no icon specified", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).not.toThrow();

            expect(fs.copySync).toHaveBeenCalled();
        });

        it("should use the default icon config when no icon is specified", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);

            mockParsing(data);

            configParser.parse(configBareMinimumPath, session, function (configObj) {
                expect(configObj.icon).toEqual(["default-icon.png"]);
            });
        });

        it("should not use the default icon config when icon is specified", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["icon"] = {
                "@": {
                    "src": "test.png"
                }
            };

            mockParsing(data);

            configParser.parse(configPath, session, function (configObj) {
                expect(configObj.icon).toEqual(["test.png"]);
                expect(configObj.icon).not.toEqual(["default-icon.png"]);
                expect(configObj.icon).not.toContain("default-icon.png");
            });
        });
    }