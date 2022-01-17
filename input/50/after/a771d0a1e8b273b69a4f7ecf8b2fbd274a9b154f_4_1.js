function(test) {
    test.expect(1);

    var expectA = false;
    var resultA = grunt.file.exists("fixtures/output");
    test.equal(resultA, expectA, "should rm -rf a directory");

    test.done();
  }