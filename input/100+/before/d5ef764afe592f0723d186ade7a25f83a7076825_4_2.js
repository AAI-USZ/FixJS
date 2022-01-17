function (done) {
      function error (token, idx, type) {
        if (/^error/.test(type)) done( new Error( type + ' should not trigger') )
      }
      p.setDefaultHandler(error)
      p.continue(3)
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
      p.addRule('a', function () {
        done()
      })

      p.write('aa')
    }