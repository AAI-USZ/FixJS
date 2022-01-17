function basename(path) {
        return path.replace(/\\/g,'/').replace( /.*\//, '' );
    }