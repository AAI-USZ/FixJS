function () {
        var session = testUtilities.cloneObj(testData.session),
            configObj = {
                accessList: [{
                    features: [{
                        version: "1.0.0.0",
                        required: true,
                        id: "abc.def.ijk"
                    }, {
                        id: "blackberry.identity",
                        required: true,
                        version: "1.0.0.0"
                    }],
                    uri: "WIDGET_LOCAL",
                    allowSubDomain: true
                }]    
            };


        spyOn(path, "existsSync").andCallFake(function (dir) {
            return dir.indexOf("abc") !== -1 ? false : true;
        });

        spyOn(logger, "warn");

        packagerValidator.validateConfig(session, configObj);
        //expecting the features list to have shortened by 1, since one of these APIs does not exist
        expect(configObj.accessList[0].features.length).toEqual(1);
        //expecting warning to be logged to console because API "abc.def.ijk" does not exist"
        expect(logger.warn).toHaveBeenCalledWith(localize.translate("EXCEPTION_FEATURE_NOT_FOUND", "abc.def.ijk"));

    }