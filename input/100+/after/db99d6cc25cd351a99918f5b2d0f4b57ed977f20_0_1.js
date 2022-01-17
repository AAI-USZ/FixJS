function(done) {
    if (!existsSync("test/fixtures/output")) {
      fs.mkdirSync("test/fixtures/output");
    }
    if (existsSync("test/fixtures/output/templates.js")) {
      fs.unlinkSync("test/fixtures/output/templates.js");
    }
    grunt.utils.spawn({
      cmd: "grunt",
      args: ["--config", "test/grunt.js", "handlebars"]
    }, function(err, result) {
      assert.ifError(err);
      console.log(result.stderr);
      console.log(result.stdout);
      done();
    });
  }