function () {
        configParser.parse(configPath, session, function (configObj) {
            expect(configObj.content).toEqual("local:///startPage.html");
            expect(configObj.id).toEqual("My WidgetId");
            expect(configObj.version).toEqual("1.0.0");
            expect(configObj.license).toEqual("My License");
            expect(configObj.licenseURL).toEqual("http://www.apache.org/licenses/LICENSE-2.0");
            expect(configObj.icon).toEqual(["test.png"]);
            expect(configObj.configXML).toEqual("config.xml");
            expect(configObj.author).toEqual("Research In Motion Ltd.");
            expect(configObj.authorURL).toEqual("http://www.rim.com/");
            expect(configObj.copyright).toEqual("No Copyright");
            expect(configObj.authorEmail).toEqual("author@rim.com");
            expect(configObj.name).toEqual("Demo");
            expect(configObj.description).toEqual("This app does everything.");
            expect(configObj.permissions).toContain('access_shared');
            expect(configObj.permissions).toContain('read_geolocation');
            expect(configObj.permissions).toContain('use_camera');
        });
    }