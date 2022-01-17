function (src, baton) {
    var frameworkDest = path.join(_c.DEPLOY, 'Framework/'),
        libDest = path.join(_c.DEPLOY, 'lib'),
        nodeModulesDest = path.join(_c.DEPLOY, 'node_modules'),
        
        //files
        bbwpFile = path.join(_c.ROOT, 'bbwp'),
        bbwpBatFile = path.join(_c.ROOT, 'bbwp.bat'),
        licenseFile = path.join(_c.ROOT, 'licenses.txt');

    //Copy folders to target directory
    copyFolder(_c.FRAMEWORK_DEPLOY, frameworkDest);
    copyFolder(_c.LIB, libDest);
    copyFolder(_c.NODE_MOD, nodeModulesDest);
    
    //Copy files to target directory
    utils.copyFile(bbwpFile, _c.DEPLOY);
    utils.copyFile(bbwpBatFile, _c.DEPLOY);
    utils.copyFile(licenseFile, _c.DEPLOY);
}