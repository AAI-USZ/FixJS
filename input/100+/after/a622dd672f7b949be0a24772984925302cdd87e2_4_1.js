function(options) {
  assert.currentTest = this;
  this.status = stati.executing;
  this.failures = [];
  this.checks = 0;

  try {
    this.func.apply(this.suite, [ options ]);
  }
  catch (ex) {
    assert.ok(false, '' + ex);
    console.error(ex.stack);
    if ((options.isNode || options.isFirefox) && ex.stack) {
      console.error(ex.stack);
    }
  }

  if (this.status === stati.executing) {
    this.status = stati.pass;
  }

  assert.currentTest = null;
}