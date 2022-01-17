function(filepath) {
        // Log which file has changed, and how.
        grunt.log.ok('File "' + filepath + '" ' + changedFiles[filepath] + '.');
        // Clear the modified file's cached require data.
        grunt.file.clearRequireCache(filepath);
      }