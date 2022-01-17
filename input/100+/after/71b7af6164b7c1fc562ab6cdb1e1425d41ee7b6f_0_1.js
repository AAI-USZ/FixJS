function(sourceDir, newDirLocation, opts) {

    if (!opts || !opts.preserve) {
        try {
            if(fs.statSync(newDirLocation).isDirectory()) exports.rmdirSyncRecursive(newDirLocation);
        } catch(e) { }
    }

    /*  Create the directory where all our junk is moving to; read the mode of the source directory and mirror it */
    var checkDir = fs.statSync(sourceDir);
    try {
        fs.mkdirSync(newDirLocation, checkDir.mode);
    } catch (e) {
        //if the directory already exists, that's okay
        if (e.code !== 'EEXIST') throw e;
    }

    var files = fs.readdirSync(sourceDir);

    for(var i = 0; i < files.length; i++) {
        var currFile = fs.lstatSync(sourceDir + "/" + files[i]);

        if(currFile.isDirectory()) {
            /*  recursion this thing right on back. */
            exports.copyDirSyncRecursive(sourceDir + "/" + files[i], newDirLocation + "/" + files[i], opts);
        } else if(currFile.isSymbolicLink() && !opts.resolveSymbolicLinks) {
            var symlinkFull = fs.readlinkSync(sourceDir + "/" + files[i]);
            fs.symlinkSync(symlinkFull, newDirLocation + "/" + files[i]);
        } else {
            /*  At this point, we've hit a file actually worth copying... so copy it on over. */
            var contents = fs.readFileSync(sourceDir + "/" + files[i]);
            fs.writeFileSync(newDirLocation + "/" + files[i], contents);
        }
    }
}