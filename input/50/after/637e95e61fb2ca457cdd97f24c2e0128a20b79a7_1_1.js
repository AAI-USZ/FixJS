function(done) {
    process.stdout.write = oldStdout;
    wim.onEnd();
    done();
  }