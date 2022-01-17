function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data["rim:invoke-target"] = {
            "@": {
                "id": "com.domain.subdomain.appName.app"
            }
        };

        mockParsing(data);

        expect(function () {
            configParser.parse(configPath, session, function (configObj) {});
        }).toThrow(localize.translate("EXCEPTION_INVOKE_TARGET_INVALID_TYPE"));
    }