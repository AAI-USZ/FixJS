function() {
        var cb = this.async(),
            source = this.file.src,
            files = [],
            pngConfig = grunt.config('optipng'),
            jpgConfig = grunt.config('jpegtran');

        if( grunt.utils.kindOf( source ) === 'string' && path.extname(source).length === 0 ) {
            grunt.file.recurse(source,function(abspath){
                if(abspath){
                    files.push(abspath);
                }
            });
        } else {
            files = grunt.file.expandFiles(source);
        }

        var pngfiles = files.filter(function(file) {
            return !!~png.indexOf(path.extname(file).toLowerCase());
        });

        var jpgfiles = files.filter(function(file) {
            return !!~jpegs.indexOf(path.extname(file).toLowerCase());
        });

        if (this.file.dest && !/\/$/.test(this.file.dest) ) {
            this.file.dest += '/';
        }

        grunt.helper('optipng', pngfiles, pngConfig, this.file.dest, function(err) {
            if(err) {
                grunt.log.error(err);
                return cb(false);
            }


            //REMOVE ME
            cb();


            /*grunt.helper('jpegtran', jpgfiles, jpgConfig, this.file.dest, function(err) {
                if(err) {
                    grunt.log.error(err);
                    return cb(false);
                }
                cb();
            });*/
        });
    }