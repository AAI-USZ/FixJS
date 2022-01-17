function () {
        var session = testUtilities.cloneObj(testData.session),
        configObj = {
            accessList: [{
                features: [{
                    id: "blackberry.identity",
                    required: true,
                    version: "1.0.0.0"
                }, {
                    version: "1.0.0.0",
                    required: true,
                }],
                uri: "WIDGET_LOCAL",
                allowSubDomain: true
            }]
        };
        spyOn(logger, "warn");

        spyOn(path, "existsSync").andCallFake(function () {
            //since both of these APIs exist, existsSync would return true
            return true;
        });

        expect(function () {
            packagerValidator.validateConfig(session, configObj, extManager);
        }).not.toThrow();
    }