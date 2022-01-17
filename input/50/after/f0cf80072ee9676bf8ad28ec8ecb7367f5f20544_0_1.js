function optimize(done) {
  requirejs.optimize(generateConfig(), done);
}