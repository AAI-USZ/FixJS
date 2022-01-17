function execNativePackager(session, callback) {
    var script = "/bin/blackberry-nativepackager",
        cwd = session.sourceDir,
        nativePkgr,
        msg;

    if (pkgrUtils.isWindows()) {
        script += ".bat";
    }

    nativePkgr = childProcess.spawn(path.normalize(conf.DEPENDENCIES_TOOLS + script), ["@options"], {
        "cwd": cwd,
        "env": process.env
    });

    nativePkgr.stdout.on("data", function (data) {
        msg = data.toString().replace(/[\n\r]/g, '');
        
        if (msg) {
            if (msg.toLowerCase().indexOf("error:") >= 0) {
                logger.error(msg);
            } else {
                logger.info(msg);
            }
        }
    });

    nativePkgr.stderr.on("data", function (data) {
        msg = data.toString().replace(/[\n\r]/g, '');

        if (msg) {
            if (msg.toLowerCase().indexOf("warn") >= 0) {
                logger.warn(msg);
            } else {
                logger.error(msg);
            }
        }
    });

    nativePkgr.on("exit", function (code) {
        if (callback && typeof callback === "function") {
            callback(code);
        }
    });
}