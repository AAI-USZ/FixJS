function () {
        var session = testUtilities.cloneObj(testData.session),
        configObj = {
            accessList: [{
                features: [{
                    id: "blackberry.identity",
                    required: true,
                    version: "1.0.0.0"
                }, {
                    version: "blackberry.app",
                    required: true,
                    id: "blackberry.app"
                }],
                uri: "WIDGET_LOCAL",
                allowSubDomain: true
            }, {
                features: [{
                    id: "blackberry.identity",
                    required: true,
                    version: "1.0.0.0"
                }, {
                    id: "abc.def.ijk",
                    required: true,
                    version: "1.0.0.0"
                }],
                uri: "www.cnn.com",
                allowSubDomain: true
            }]
        };
        spyOn(logger, "warn");
        
        spyOn(path, "existsSync").andCallFake(function (dir) {
            return dir.indexOf("abc") !== -1 ? false : true;
        });

        packagerValidator.validateConfig(session, configObj, extManager);
        expect(configObj.accessList[0].features.length).toEqual(2);
        expect(configObj.accessList[1].features.length).toEqual(1);
        expect(logger.warn).toHaveBeenCalledWith(localize.translate("EXCEPTION_FEATURE_NOT_FOUND", "abc.def.ijk"));
    }