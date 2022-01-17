function () {
      function _Parser (handler) {
        atok.wait(3, '_', handler)
      }

      var Parser = atokParser.createParser(_Parser)

      it('should call the handler', function (done) {
        function handler (token, idx, type) {
          assert(i === 2)
          done()
        }

        var p = new Parser(handler)
        var i = 0

        p.write('_')
        i++
        p.write('_')
        i++
        p.write('_')
      })
    }