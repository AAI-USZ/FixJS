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
                        id: "blackberry.event"
                    }],
                    uri: "WIDGET_LOCAL",
                    allowSubDomain: true
                }]
            };

        spyOn(path, "existsSync").andCallFake(function () {
            //since both of these APIs exist, existsSync would return true
            return true;
        });

        packagerValidator.validateConfig(session, configObj);
        expect(configObj.accessList[0].features.length).toEqual(2);
        

    }