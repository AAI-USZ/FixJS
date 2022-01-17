function () {
    describe('and 2 groups', function () {
      var p = new Tokenizer

      it('should trigger on match', function (done) {
        function error (token, idx, type) {
          if (/^error/.test(type)) done( new Error( type + ' should not trigger') )
        }
        p.setDefaultHandler(error)
        p.continue(4)
        p.addRule('a', 'first')
        p.continue()
        p.groupRule(true)
          p.addRule('a', 'error-1')
          p.addRule('a', 'error-2')
        p.groupRule()
        p.addRule('a', error)
        p.groupRule(true)
          p.addRule('a', 'error-3')
          p.addRule('a', 'error-4')
        p.groupRule()
        p.addRule('a', 'error-5')
        p.addRule('a', function () {
          done()
        })

        p.write('aa')
      })
    })

    describe('and 1 nested group', function () {
      var p = new Tokenizer

      it('should trigger on match', function (done) {
        function error (token, idx, type) {
          if (/^error/.test(type)) done( new Error( type + ' should not trigger') )
        }
        p.setDefaultHandler(error)
        p.continue(1)
        p.addRule('a', 'first')
        p.continue()
        p.groupRule(true)
          p.addRule('a', 'error-1')
          p.addRule('a', 'error-2')
          p.groupRule(true)
            p.addRule('a', 'error-3')
            p.addRule('a', 'error-4')
          p.groupRule()
          p.addRule('a', 'error-5')
          p.addRule('a', 'error-6')
        p.groupRule()
        p.addRule('a', function () {
          done()
        })

        p.write('aa')
      })
    })

    describe('and 1 leading nested group', function () {
      var p = new Tokenizer

      it('should trigger on match', function (done) {
        function error (token, idx, type) {
          if (/^error/.test(type)) done( new Error( type + ' should not trigger') )
        }
        p.setDefaultHandler(error)
        p.continue(1)
        p.addRule('a', 'first')
        p.continue()
        p.groupRule(true)
          p.groupRule(true)
            p.addRule('a', 'error-1')
            p.addRule('a', 'error-2')
          p.groupRule()
          p.addRule('a', 'error-3')
          p.addRule('a', 'error-4')
        p.groupRule()
        p.addRule('a', function () {
          done()
        })

        p.write('aa')
      })
    })

    describe('and 1 trailing nested group', function () {
      var p = new Tokenizer

      it('should trigger on match', function (done) {
        function error (token, idx, type) {
          if (/^error/.test(type)) done( new Error( type + ' should not trigger') )
        }
        p.setDefaultHandler(error)
        p.continue(1)
        p.addRule('a', 'first')
        p.continue()
        p.groupRule(true)
          p.addRule('a', 'error-1')
          p.addRule('a', 'error-2')
          p.groupRule(true)
            p.addRule('a', 'error-3')
            p.addRule('a', 'error-4')
          p.groupRule()
        p.groupRule()
        p.addRule('a', function () {
          done()
        })

        p.write('aa')
      })
    })

    describe('and 2 groups with a same group level jump', function () {
      var p = new Tokenizer

      it('should trigger on match', function (done) {
        function error (token, idx, type) {
          if (/^error/.test(type)) done( new Error( type + ' should not trigger') )
        }
        p.setDefaultHandler(error)
        p.continue(0)
        p.addRule('a', 'first')
        p.continue()
        p.groupRule(true)
          p.addRule('b', 'error-1')
            p.continue(2)
            p.addRule('a', 'second')
            p.continue()
            p.addRule('a', 'error-2')
        p.groupRule()
        p.groupRule(true)
          p.addRule('a', 'error-4')
          p.addRule('a', 'error-5')
        p.groupRule()
        p.addRule('a', function () {
          done()
        })

        p.write('aaa')
      })
    })
  }