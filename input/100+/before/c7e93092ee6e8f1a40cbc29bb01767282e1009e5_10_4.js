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

        expect(function () {
            packagerValidator.validateConfig(session, configObj);
        }).not.toThrow();
    }