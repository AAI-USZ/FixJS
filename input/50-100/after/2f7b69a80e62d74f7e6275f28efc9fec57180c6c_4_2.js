function () {
      function _Parser (handler) {
        atok.wait(1, '_', handler)
      }

      var Parser = atokParser.createParser(_Parser)

      it('should call the handler', function (done) {
        function handler (token, idx, type) {
            done()
        }

        var p = new Parser(handler)

        p.write('_a_')
      })
    }