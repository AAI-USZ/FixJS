function execNativePackager(session, callback) {
    var script = "/bin/blackberry-nativepackager",
        cwd = session.sourceDir,
        nativePkgr;

    if (pkgrUtils.isWindows()) {
        script += ".bat";
    }

    nativePkgr = childProcess.spawn(path.normalize(conf.DEPENDENCIES_TOOLS + script), ["@options"], {
        "cwd": cwd,
        "env": process.env
    });

    nativePkgr.stdout.on("data", pkgrUtils.handleProcessOutput);

    nativePkgr.stderr.on("data", pkgrUtils.handleProcessOutput);

    nativePkgr.on("exit", function (code) {
        if (callback && typeof callback === "function") {
            callback(code);
        }
    });
}