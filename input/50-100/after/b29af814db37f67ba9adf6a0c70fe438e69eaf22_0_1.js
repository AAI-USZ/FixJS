function(err) {
            if(err) grunt.log.error(err);

            grunt.helper('jpegtran', jpgfiles, jpgConfig, dest, function(err) {
                if(err) grunt.log.error(err);
                cb();
            });
        }