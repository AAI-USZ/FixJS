function (src, baton) {
    var libDest = path.join(_c.DEPLOY, 'lib'),
        extDest = path.join(_c.DEPLOY, 'ext'),
        clientFilesDest = path.join(_c.DEPLOY, 'clientFiles'),
        bootstrapDest = path.join(_c.DEPLOY, 'dependencies/bootstrap'),
        browserRequireDest = path.join(_c.DEPLOY, 'dependencies/bootstrap/'),
        webplatformDest = path.join(_c.DEPLOY, 'dependencies/bootstrap/'),
        
        //files
        readmeFile = path.join(_c.ROOT, 'README.md'),
        licenseFile = path.join(_c.ROOT, 'LICENSE');

    require('./bundler').bundle();

    //Copy folders to target directory
    copyFolder(_c.LIB, libDest);
    copyExtensions(_c.EXT, extDest);
    copyFolder(_c.CLIENTFILES, clientFilesDest);
    copyFolder(_c.DEPENDENCIES_BOOTSTRAP, bootstrapDest);
    
    //Copy files to target directory (DO NOT copy webplatform-framework lib/* files over)
    utils.copyFile(_c.DEPENDENCIES_WEBPLATFORM_FRAMEWORK_REQUIRE, browserRequireDest);
    utils.copyFile(_c.DEPENDENCIES_WEBPLATFORM_FRAMEWORK_LIB, webplatformDest);
    utils.copyFile(readmeFile, _c.DEPLOY);
    utils.copyFile(licenseFile, _c.DEPLOY);
    
    //Remove public folder
    wrench.rmdirSyncRecursive(_c.DEPLOY + 'lib/public', true);
}