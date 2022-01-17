function () {
        testUtils.mockResolve(path);
        
        var session = testUtils.cloneObj(testData.session),
            config = testUtils.cloneObj(testData.config),
            target = "device",
            optionsFile = "-package" + NL +
                "-buildId" + NL +
                "100" + NL +
                path.normalize("c:/device/Demo.bar") + NL +
                "-barVersion" + NL +
                "1.5" + NL +
                "-C" + NL +
                path.normalize("c:/src/") + NL +
                "blackberry-tablet.xml" + NL +
                path.normalize("c:/src/abc") + NL +
                path.normalize("c:/src/xyz") + NL;

        //Set signing params [-g --buildId]
        session.keystore = path.normalize("c:/author.p12");
        session.storepass = "password";
        config.buildId = "100";
        
        session.barPath = path.normalize("c:/%s/" + "Demo.bar");
        session.sourceDir = path.normalize("c:/src/");
        session.isSigningRequired = function () {
            return true;
        };
        
        //Set -d param
        session.debug = "";

        nativePkgr.exec(session, target, config, callback);

        //options file should NOT contain -devMode
        expect(fs.writeFileSync).toHaveBeenCalledWith(jasmine.any(String), optionsFile);
    }