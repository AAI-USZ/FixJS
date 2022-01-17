function () {
        var callback = jasmine.createSpy(),
            session = testData.session,
            config = testData.config,
            target = session.targets[0];

        spyOn(wrench, "mkdirSyncRecursive");
        spyOn(fileMgr, "copyWWE");
        spyOn(fileMgr, "copyBarDependencies");
        spyOn(fileMgr, "copyExtensions");
        spyOn(fileMgr, "generateFrameworkModulesJS");
        spyOn(nativePkgr, "exec").andCallFake(function (session, target, config, callback) {
            callback(0);
        });

        barBuilder.build(session, testData.config, extManager, callback);

        expect(wrench.mkdirSyncRecursive).toHaveBeenCalledWith(session.outputDir + "/" + target);
        expect(fileMgr.copyWWE).toHaveBeenCalledWith(session, target);
        expect(fileMgr.copyBarDependencies).toHaveBeenCalledWith(session, target);
        expect(fileMgr.copyExtensions).toHaveBeenCalledWith(config.accessList, session, target, extManager);
        expect(fileMgr.generateFrameworkModulesJS).toHaveBeenCalledWith(session);
        expect(nativePkgr.exec).toHaveBeenCalledWith(session, target, config, jasmine.any(Function));
        expect(callback).toHaveBeenCalledWith(0);
    }