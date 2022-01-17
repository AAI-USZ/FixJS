function () {
      function _Parser (handler) {
        atok.wait('__', '__', handler)
      }

      var Parser = atokParser.createParser(_Parser)

      it('should call the handler', function (done) {
        function handler (token, idx, type) {
          assert(i === 2)
          done()
        }
        
        var p = new Parser(handler)
        var i = 0

        p.write('__')
        i++
        p.write('a')
        i++
        p.write('__')
      })
    }