function(request) {
        var paths = [], dir;

        if (request[0] === '.') {
            paths.push(fs.absolute(joinPath(this.dirname, request)));
        } else if (request[0] === '/') {
            paths.push(fs.absolute(request));
        } else {
            dir = this.dirname;
            while (dir !== '') {
                paths.push(joinPath(dir, 'node_modules', request));
                dir = dirname(dir);
            }
        }

        return paths;
    }