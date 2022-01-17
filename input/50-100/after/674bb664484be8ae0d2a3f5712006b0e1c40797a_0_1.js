function(error, result, code) {
      if (error) {
        grunt.warn("Make sure the testacular server is online: run `grunt server`.\n"+
          "Also make sure you have a browser open to http://localhost:8080/.\n"+
          error.stdout+error.stderr);
        //the testacular runner somehow modifies the files if it errors(??).
        //this causes grunt's watch task to re-fire itself constantly,
        //unless we wait for a sec
        setTimeout(done, 1000);
      } else {
        grunt.log.write(result.stdout);
        done();
      }
    }