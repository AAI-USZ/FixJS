function () {
  describe('when I require ./samples/foo-without-require-override.js with absolute path', function () {
    it('finds it', function () {
      should.exist(proxyquire.require(path.join(__dirname, './samples/foo-without-require-override.js')));
    })  
  })

  describe('when I require ./file-that-doesnt-exist.js with absolute path', function () {
    it('finds it', function () {
      (function () { 
        proxyquire.require(path.join(__dirname, './file-that-doesnt-exist.js'))
      }).should.throw(/cannot find file/i);
    })  
  })
  
}