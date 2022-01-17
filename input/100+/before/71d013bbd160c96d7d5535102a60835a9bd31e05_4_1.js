function () {
    var Parser = atokParser.createParserFromFile('./parsers/matchHelperParser.js', 'options')

    beforeEach(function (done) {
      p = new Parser(options)
      p.on('error', function (e) { err = e })
      err = null
      done()
    })

    describe('with no match', function () {
      it('should skip it', function (done) {
      // console.log(p.atok._rules)
        function handler (token, idx, type) {
          err = new Error('Handler should not be called')
        }

        p.on('data', handler)
        p.write('abc)def')
        assert.equal(p.atok.offset, 0)
        done(err)
      })
    })

    describe('with full data match', function () {
      it('should parse it', function (done) {
        p.on('data', getHandler('abc', done))
        p.write('(abc)')
      })
    })


    describe('with end not in a string', function () {
      var p = new Parser(options)
      it('should parse it', function (done) {
        p.on('data', getHandler('abc', done))
        p.write('(abc)def')
      })
    })

    describe('with end in a string', function () {
      it('should parse it', function (done) {
        p.on('data', getHandler('a"b)c"d', done))
        p.write('(a"b)c"d)ef')
      })
    })

    describe('with a split end', function () {
      it('should parse it when string ends', function (done) {
        p.on('data', getHandler('abcd', done))
        p.write('(abc')
        p.write('d)ef')
      })
    })

    describe('with a split end in a string', function () {
      it('should parse it when string ends', function (done) {
        p.on('data', getHandler('a"b)cd"', done))
        p.write('(a"b)cd"')
        p.write(')ef')
      })
    })

    describe('with a split end in a split string', function () {
      it('should parse it when string ends', function (done) {
        p.on('data', getHandler('a"b)cd"', done))
        p.write('(a"b)c')
        p.write('d")ef')
      })
    })
  }