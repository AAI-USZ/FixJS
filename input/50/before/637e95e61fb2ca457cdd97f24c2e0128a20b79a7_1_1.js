function(done) {
    process.stdout.write = oldStdout;
    done();
  }