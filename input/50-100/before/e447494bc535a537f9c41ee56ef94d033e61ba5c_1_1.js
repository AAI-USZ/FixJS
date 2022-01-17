function(err) {
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
        }