function () {
        var bareMinimumConfigPath = path.resolve("test/config-bare-minimum.xml");

        configParser.parse(bareMinimumConfigPath, session, function (configObj) {
            expect(configObj.content).toEqual("local:///startPage.html");
            expect(configObj.version).toEqual("1.0.0");
        });
    }