function () {
        var licenseConfigPath = path.resolve("test/config-license.xml");

        configParser.parse(licenseConfigPath, session, function (configObj) {
            expect(configObj.license).toEqual("");
            expect(configObj.licenseURL).toEqual("http://www.apache.org/licenses/LICENSE-2.0");
        });
    }