function () {
        var libFiles = [],
            extFiles = [],
            modulesArr;

        libFiles.push(path.normalize(session.sourcePaths.CHROME + "/lib/framework.js"));
        libFiles.push(path.normalize(session.sourcePaths.CHROME + "/lib/config/user.js"));
        libFiles.push(path.normalize(session.sourcePaths.CHROME + "/lib/plugins/bridge.js"));
        libFiles.push(path.normalize(session.sourcePaths.CHROME + "/lib/policy/whitelist.js"));
        extFiles.push(path.normalize(session.sourcePaths.CHROME + "/ext/blackberry.app/client.js"));
        extFiles.push(path.normalize(session.sourcePaths.CHROME + "/ext/blackberry.app/index.js"));
        extFiles.push(path.normalize(session.sourcePaths.CHROME + "/ext/blackberry.connection/client.js"));
        extFiles.push(path.normalize(session.sourcePaths.CHROME + "/ext/blackberry.connection/index.js"));        
        extFiles.push(path.normalize(session.sourcePaths.CHROME + "/ext/blackberry.event/client.js"));
        extFiles.push(path.normalize(session.sourcePaths.CHROME + "/ext/blackberry.event/index.js"));        

        spyOn(wrench, "readdirSyncRecursive").andCallFake(function (path) {
            if (/ext$/.test(path)) {
                return extFiles;
            } else {
                return libFiles;
            }
        });
        spyOn(fs, "statSync").andReturn({
            isDirectory: function () {
                return false;
            }
        });
        spyOn(path, "existsSync").andReturn(true);
        spyOn(JSON, "stringify");
        spyOn(fs, "writeFileSync");

        fileMgr.generateFrameworkModulesJS(session);

        modulesArr = JSON.stringify.mostRecentCall.args[0];
        modulesArr.forEach(function (module) {
            expect(module.match(/^lib\/|^ext\//)).toBeTruthy();
        });
        expect(modulesArr).toContain("lib/framework.js");
        expect(modulesArr).toContain("lib/config/user.js");
        expect(modulesArr).toContain("lib/plugins/bridge.js");
        expect(modulesArr).toContain("lib/policy/whitelist.js");
        expect(modulesArr).toContain("ext/blackberry.event/index.js");
    }