function () {
    function _Parser (options) {
      atok
        .trimLeft(!options.trimLeft)
        .trimRight(!options.trimRight)
        .match('(', ')')
    }

    var Parser = atokParser.createParser(_Parser)

    describe('trimLeft(true)', function () {
      var p = new Parser({ trimLeft: true })

      it('should parse it', function (done) {
        p.atok.on('data', getHandler('(abc', done))
        p.write('(abc)')
      })
    })

    describe('trimRight(true)', function () {
      var p = new Parser({ trimRight: true })

      it('should parse it', function (done) {
        p.atok.on('data', getHandler('abc)', done))
        p.write('(abc)')
      })
    })

    describe('trimLeft(true).trimRight(true)', function () {
      var p = new Parser({ trimLeft: true, trimRight: true })

      it('should parse it', function (done) {
        p.atok.on('data', getHandler('(abc)', done))
        p.write('(abc)')
      })
    })
  }