function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        
        //--buildId 100
        session.buildId = "100";

        mockParsing(data);

        configParser.parse(configPath, session, function (configObj) {
            expect(configObj.buildId).toEqual("100");
        });
    }