function () {
      function _Parser (handler) {
        atok.wait('__', '__', handler)
      }

      var Parser = atokParser.createParser(_Parser)

      it('should call the handler', function (done) {
        function handler (token, idx, type) {
          assert(i === 3)
          done()
        }
        
        var p = new Parser(handler)
        var i = 0

        p.write('_')
        i++
        p.write('_a')
        i++
        p.write('_')
        i++
        p.write('_')
      })
    }