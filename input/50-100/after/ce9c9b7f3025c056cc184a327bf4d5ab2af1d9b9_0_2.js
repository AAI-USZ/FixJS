function(name) {
        if (fs.existsSync(path.join(filePath, name, name + '.js'))) {
            result.push(name);
        } else if ( fs.statSync(path.join(filePath, name)).isDirectory() ) {
            result = result.concat(listExamples(path.join(filePath, name)).map(function(subname) {
                return path.join(name, subname);
            }));
        }
    }