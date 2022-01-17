function (cmdline) {
        var sourceDir,
            signingPassword,
            outputDir = cmdline.output,
            archivePath = path.resolve(cmdline.args[0]),
            archiveName = path.basename(archivePath, '.zip'),
            buildId = cmdline.buildId;

        //If -o option was not provided, default output location is the same as .zip
        outputDir = outputDir || path.dirname(archivePath);

        //Only set signingPassword if it contains a value
        if (cmdline.password && "string" === typeof cmdline.password) {
            signingPassword = cmdline.password;
        }
        
        //If -s [dir] is provided
        if (cmdline.source && "string" === typeof cmdline.source) {
            sourceDir = cmdline.source + "/src";
        } else {
            sourceDir = outputDir + "/src";
        }
        
        if (!path.existsSync(sourceDir)) {
            wrench.mkdirSyncRecursive(sourceDir, "0755");
        }

        return {
            "conf": require("./conf"),
            "keepSource": !!cmdline.source,
            "sourceDir": path.resolve(sourceDir),
            "sourcePaths": {
                "ROOT": path.resolve(sourceDir),
                "CHROME": path.normalize(path.resolve(sourceDir) + barConf.CHROME),
                "LIB": path.normalize(path.resolve(sourceDir) + barConf.LIB),
                "EXT": path.normalize(path.resolve(sourceDir) + barConf.EXT),
                "UI": path.normalize(path.resolve(sourceDir) + barConf.UI),
                "PLUGINS": path.normalize(path.resolve(sourceDir) + barConf.PLUGINS),
                "JNEXT_PLUGINS": path.normalize(path.resolve(sourceDir) + barConf.JNEXT_PLUGINS)
            },
            "outputDir": path.resolve(outputDir),
            "archivePath": archivePath,
            "archiveName": archiveName,
            "barPath": outputDir + "/%s/" + archiveName + ".bar",
            "verbose": !!cmdline.verbose,
            "debug": !!cmdline.debug,
            "keystore": signingHelper.getKeyStorePath(),
            "keystoreCsk": signingHelper.getCskPath(),
            "keystoreDb": signingHelper.getDbPath(),
            "storepass": signingPassword,
            "buildId": buildId,
            "targets": ["simulator", "device"]
        };
    }