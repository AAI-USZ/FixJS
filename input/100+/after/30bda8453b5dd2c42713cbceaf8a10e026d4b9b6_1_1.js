function buildTarget(previous, baton) {
    baton.take();

    var target = this.session.targets[targetIdx++],
        session = this.session,
        config = this.config;
    
    //Create output folder
    wrench.mkdirSyncRecursive(session.outputDir + "/" + target);
    
    //Copy target dependent files
    fileManager.copyWWE(this.session, target);
    fileManager.copyBarDependencies(this.session, target);
    fileManager.copyExtensions(this.config.accessList, this.session, target, this.extManager);
    
    //Generate frameworkModules.js (this needs to be done AFTER all files have been copied)
    fileManager.generateFrameworkModulesJS(session);

    //Call native-packager module for target
    nativePkgr.exec(session, target, config, function (code) {
        if (code !== 0) {
            logger.error(localize.translate("EXCEPTION_NATIVEPACKAGER"));
            baton.pass(code);
        } else {
            if (target === "device" && session.isSigningRequired(config)) {
                signingHelper.execSigner(session, target, function (code) {
                    baton.pass(code);
                });
            } else {
                baton.pass(code);
            }
        }
    });
}