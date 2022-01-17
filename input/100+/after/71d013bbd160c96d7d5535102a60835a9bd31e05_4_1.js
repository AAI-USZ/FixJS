function () {
      var p = new Parser(options)
      it('should parse it', function (done) {
        p.on('data', getHandler('abc', done))
        p.write('(abc)def')
      })
    }