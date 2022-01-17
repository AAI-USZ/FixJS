function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data["@"].version = "1.0.0.50";

        mockParsing(data);

        configParser.parse(configPath, session, function (configObj) {
            expect(configObj.version).toEqual("1.0.0");
            expect(configObj.buildId).toEqual("50");
        });
    }