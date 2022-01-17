function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data.feature = {}; 
        mockParsing(data);

        expect(function () {
            configParser.parse(configPath, session, {});
        }).toThrow(localize.translate("EXCEPTION_INVALID_FEATURE_ID"));
    }