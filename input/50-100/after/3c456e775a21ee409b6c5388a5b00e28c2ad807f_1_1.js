function(filepath) {
        var status = changedFiles[filepath];
        // Log which file has changed, and how.
        grunt.log.ok('File "' + filepath + '" ' + status + '.');
        // Add filepath to grunt.file._watchFiles for grunt.file.expand* methods.
        grunt.file._watchFiles[status === 'deleted' ? 'deleted' : 'changed'].push(filepath);
        // Clear the modified file's cached require data.
        grunt.file.clearRequireCache(filepath);
      }