function generateOptionsFile(session, target, config) {
    var srcFiles = wrench.readdirSyncRecursive(session.sourceDir),
        isSigning = session.isSigningRequired(config),
        optionsStr = "-package" + NL,
        debugToken,
        params = session.getParams("blackberry-nativepackager");
    
    //if -d was provided and we are not signing [-g], set debugToken
    if (session.debug && !isSigning) {
        if (path.extname(conf.DEBUG_TOKEN) === ".bar") {
            if (path.existsSync(conf.DEBUG_TOKEN)) {
                debugToken = "-debugToken" + NL;
                debugToken += conf.DEBUG_TOKEN + NL;
            }
            else {
                logger.warn(localize.translate("EXCEPTION_DEBUG_TOKEN_NOT_FOUND"));
            }
        } else {
            logger.warn(localize.translate("EXCEPTION_DEBUG_TOKEN_WRONG_FILE_EXTENSION"));
        }
    }

    if (target === "device" && isSigning) {
        optionsStr += "-buildId" + NL;
        optionsStr += config.buildId + NL;
    } else if (session.debug) {
        //DebugToken params
        optionsStr += "-devMode" + NL;
        optionsStr += (debugToken ? debugToken : "");
    }

    if (params) {
        Object.getOwnPropertyNames(params).forEach(function (p) {
            optionsStr += p + NL;

            if (params[p]) {
                optionsStr += params[p] + NL;
            }
        });
    }

    optionsStr += path.resolve(util.format(session.barPath, target)) + NL;

    //to supoprt splash screens/icons for multiple resolutions/devices
    optionsStr += "-barVersion" + NL;
    optionsStr += "1.5" + NL;

    optionsStr += "-C" + NL;
    optionsStr += session.sourceDir + NL;
    optionsStr += "blackberry-tablet.xml" + NL;

    srcFiles.forEach(function (file) {
        file = path.resolve(session.sourceDir, file);

        if (file.indexOf("blackberry-tablet.xml") < 0 && !fs.statSync(file).isDirectory()) {
            optionsStr += file + NL;
        }
    });

    fs.writeFileSync(path.normalize(session.sourceDir + "/options"), optionsStr);
}