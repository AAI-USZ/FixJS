function(directory){
            var ret = new Promise();
            fs.readdir(directory, hitch(this, function(err, files){
                if (err) {
                    ret.errback(err);
                } else {
                    files = files.filter(function(file){
                        return file.match(this.MIGRATION_FILE_PATTERN) != null;
                    }, this);
                    ret.callback(files.map(function(file){
                        return path.resolve(directory, file)
                    }));
                }
            }));
            return ret;
        }