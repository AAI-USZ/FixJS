function getProjectDir(directory) {
    if ( directory ) {
        var pp = path.join(directory, 'package.json');
        // console.log("Analyzing", pp);
        if ( fs.existsSync(pp) ) {
            return directory;
        }
        else {
            return getProjectDir( path.dirname(directory) );
        }
    }
    else {
        // console.log("Starting off with", path.dirname(module.parent.id) );
        return getProjectDir( getProject().id );
    }
}