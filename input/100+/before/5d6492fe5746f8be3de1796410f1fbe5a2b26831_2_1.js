function() {
  var compiler;
  beforeEach(function(){
    var app = TestHelper.mockApp();
    compiler = new JsonCompiler();
  });

  describe("Compile", function(){
    it('should only have dev variables', function(done) {
      compiler.compile(TestHelper.jsRoot + "/config.json", TestHelper.fixture("/js/config.json"), function(err, data) {
        should.not.exist(err);

        data.should.include('def');
        done();
      });
    });
  });
}