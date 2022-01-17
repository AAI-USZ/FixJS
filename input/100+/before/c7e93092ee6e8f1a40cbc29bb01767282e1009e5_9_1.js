function () {
        var session = testData.session,
            feature = "blackberry.app",
            toDir = path.join(session.sourcePaths.EXT, feature),
            apiDir = path.resolve(session.conf.EXT, feature),
            
            //extension javascript files
            indexJS = path.join(apiDir, "index.js"),
            clientJS = path.join(apiDir, "client.js"),
            subfolderJS = path.join(apiDir, "/subfolder/myjs.js");//Sub folder js file
            

        spyOn(wrench, "mkdirSyncRecursive");
        spyOn(packager_utils, "copyFile");
        
        //Mock the extension directory
        spyOn(wrench, "readdirSyncRecursive").andCallFake(function (directory) {
            return [
                indexJS,
                clientJS,
                subfolderJS,
            ];
        });

        fileMgr.copyExtensions(testData.accessList, session, session.targets[0]);

        //Extension directory is created
        expect(wrench.mkdirSyncRecursive).toHaveBeenCalledWith(toDir, "0755");
        
        //Javascript files are copied
        expect(packager_utils.copyFile).toHaveBeenCalledWith(indexJS, toDir, apiDir);
        expect(packager_utils.copyFile).toHaveBeenCalledWith(clientJS, toDir, apiDir);
        expect(packager_utils.copyFile).toHaveBeenCalledWith(subfolderJS, toDir, apiDir);
    }