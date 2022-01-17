function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data['rim:permit'] = [];

        mockParsing(data);
        
        configParser.parse(configPath, session, extManager, function (configObj) {
            //access_internet permission was set
            expect(configObj.permissions).toContain('access_internet');
        });
    }