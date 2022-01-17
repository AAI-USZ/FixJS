function(packagePath) {
    if (packagePath.indexOf('/') === 0)
        return packagePath;
    var DIR = process.cwd();
    var found = false;
    var paths = module.parent.paths;
    
    for (var i = 0; i < paths.length; ++i){
        var dir = path.dirname(paths[i]);
        if (fs.existsSync(path.join(dir, 'package.json'))){
            DIR = dir;
            found = true;
            break;
        }
    }

    if (!found){
        console.log("autoresolve: WARNING, package.json not found. Defaulting to process.cwd().");
    }

    //console.log(DIR);
    return path.join(DIR, packagePath);
}