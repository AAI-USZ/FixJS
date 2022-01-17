function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data.content["@"].src = "localFile.html";
        
        mockParsing(data);
        
        configParser.parse(configPath, session, function (configObj) {
            expect(configObj.content).toEqual("local:///localFile.html");
        });
    }