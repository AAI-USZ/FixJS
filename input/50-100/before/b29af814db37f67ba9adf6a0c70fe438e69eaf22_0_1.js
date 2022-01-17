function(err) {
            if(err) {
                grunt.log.error(err);
                return cb(false);
            }

            grunt.helper('jpegtran', jpgfiles, jpgConfig, dest, function(err) {
                if(err) {
                    grunt.log.error(err);
                    return cb(false);
                }
                cb();
            });
        }