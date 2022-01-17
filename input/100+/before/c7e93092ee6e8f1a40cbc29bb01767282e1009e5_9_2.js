function () {
        var session = testData.session,
            feature = "blackberry.app",
            apiDir = path.resolve(session.conf.EXT, feature),
            soDest = session.sourcePaths.JNEXT_PLUGINS,
            
            //extension .so files
            simulatorSO = path.join(apiDir, "/simulator/myso.so"),//simulator so file
            deviceSO = path.join(apiDir, "/device/myso.so");//device so file
            

        spyOn(path, "existsSync").andReturn(true);
        spyOn(wrench, "mkdirSyncRecursive");
        spyOn(packager_utils, "copyFile");
        
        //Mock the extension directory
        spyOn(wrench, "readdirSyncRecursive").andCallFake(function (directory) {
            return [
                simulatorSO,
                deviceSO
            ];
        });

        fileMgr.copyExtensions(testData.accessList, session, session.targets[0]);

        //plugins/jnext output directory is created
        expect(wrench.mkdirSyncRecursive).toHaveBeenCalledWith(session.sourcePaths.JNEXT_PLUGINS, "0755");
        
        //The .so files are copied
        expect(packager_utils.copyFile).toHaveBeenCalledWith(simulatorSO, soDest);
        expect(packager_utils.copyFile).toHaveBeenCalledWith(deviceSO, soDest);
    }