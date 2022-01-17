function (feature) {
                apiDir = path.normalize(path.resolve(extPath, feature.id));
                apiNativeDir = path.normalize(path.join(apiDir, "native"));
                soPath = path.normalize(path.join(apiDir, target));

                if (!copied.hasOwnProperty(feature.id)) {
                    copied[feature.id] = true;

                    if (path.existsSync(apiDir)) {
                        //verify mandatory api files exist
                        checkAPIFolder(apiDir);
                        
                        //create output folders
                        wrench.mkdirSyncRecursive(path.join(extDest, feature.id), "0755");
                        wrench.mkdirSyncRecursive(soDest, "0755");
                        
                        //find all .js files
                        jsFiles = packager_utils.listFiles(apiDir, function (file) {
                            return path.extname(file) === ".js";
                        });
                        
                        //Copy each .js file to its extensions folder
                        jsFiles.forEach(function (jsFile) {
                            packager_utils.copyFile(jsFile, path.join(extDest, feature.id), apiDir);
                        });
                        
                        if (path.existsSync(soPath)) {
                            //find all .so files
                            soFiles = packager_utils.listFiles(soPath, function (file) {
                                return path.extname(file) === ".so";
                            });
                            
                            //Copy each .so file to the extensions folder
                            soFiles.forEach(function (soFile) {
                                packager_utils.copyFile(soFile, soDest);
                            });
                        }
                    }
                }
            }