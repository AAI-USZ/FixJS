function () {
  var sourceFiles = ['src/tests/utils/test-doubles.js', 'src/tests/utils/custom-matchers.js'];
  collectSourceFilesInDir(sourceFiles, 'src/tests/unit');

  return {
    codeAnalysis:codeAnalyzer(sourceFiles, {
      bitwise:true, eqeqeq:true, forin:true, immed:true, strict:false,
      latedef:true, nonew:true, noarg:true, undef:true,
      trailing:true, laxcomma:true, validthis:true,

      newcap:true, browser:false, node:false, jquery:false,
      predef:['todo', 'test', 'jasmine', 'afterEach', 'beforeEach', 'expect',
        'describe', 'it', 'xdescribe', 'xit', 'waits', 'waitsFor', 'runs', 'spyOn']
    }),
    execute:function (moduleToTest, callback) {
      var sources = moduleToTest.sources();
      sources.push('src/tests/libs/larrymyers-jasmine-reporters/src/jasmine.junit_reporter.js');
      Array.prototype.push.apply(sources, sourceFiles);
      executeTestSuite('todo', sources, callback);
    }
  };
}