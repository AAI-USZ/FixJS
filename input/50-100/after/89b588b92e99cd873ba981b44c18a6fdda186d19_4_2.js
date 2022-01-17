function (done) {
        p.addRule('b', function (token, idx, type) {
          done()
        })
        p.saveRuleSet('b')

        p.continue(0)
        p.addRule('a', function (token, idx, type) {
          p.loadRuleSet('b')
        })
        p.continue()
        p.addRule('b', function (token, idx, type) {
          done( new Error('Should not trigger') )
        })
        
        p.write('ab')
      }