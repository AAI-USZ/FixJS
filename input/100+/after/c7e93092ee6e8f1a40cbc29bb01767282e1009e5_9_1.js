function () {
        var session = testData.session,
            featureId = "blackberry.app",
            extBasename = "app",
            toDir = path.join(session.sourcePaths.EXT, featureId),
            apiDir = path.resolve(session.conf.EXT, extBasename),
            
            //extension javascript files
            indexJS = path.join(apiDir, "index.js"),
            clientJS = path.join(apiDir, "client.js"),
            manifestJSON = path.join(apiDir, "manifest.json"),
            subfolderJS = path.join(apiDir, "/subfolder/myjs.js");//Sub folder js file
            

        spyOn(path, "existsSync").andReturn(true);
        spyOn(wrench, "mkdirSyncRecursive");
        spyOn(packager_utils, "copyFile");
        
        //Mock the extension directory
        spyOn(wrench, "readdirSyncRecursive").andCallFake(function (directory) {
            return [
                indexJS,
                clientJS,
                manifestJSON,
                subfolderJS,
            ];
        });

        fileMgr.copyExtensions(testData.accessList, session, session.targets[0], extManager);

        //Extension directory is created
        expect(wrench.mkdirSyncRecursive).toHaveBeenCalledWith(toDir, "0755");
        
        //Javascript files are copied
        expect(packager_utils.copyFile).toHaveBeenCalledWith(indexJS, toDir, apiDir);
        expect(packager_utils.copyFile).toHaveBeenCalledWith(clientJS, toDir, apiDir);
        expect(packager_utils.copyFile).toHaveBeenCalledWith(manifestJSON, toDir, apiDir);
        expect(packager_utils.copyFile).toHaveBeenCalledWith(subfolderJS, toDir, apiDir);
    }