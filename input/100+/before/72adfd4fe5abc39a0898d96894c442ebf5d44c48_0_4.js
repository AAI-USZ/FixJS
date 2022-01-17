function(path)
    {
        try {
            var i = 0
            var dirs = path.split(this.sep);
            if (dirs.length == 0) return 0
            if (isWindows(navigator.platform)) {
                path = dirs[0];
                i++;
            } else {
                path = ""
            }
            while (i < dirs.length) {
                path += this.sep + dirs[i];
                if (!FileIO.exists(path) && !DirIO.create(FileIO.open(path))) {
                    return false
                }
                i++;
            }
            return true;
        }
        catch (e) {
            debug('Error:' + e);
            return false;
        }
    }