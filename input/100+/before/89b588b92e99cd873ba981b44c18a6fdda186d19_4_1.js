function (done) {
        p.continue(1)
        p.addRule('a', 'a')
        p.addRule(function () { return 0 }, 'noop')
        p.addRule('b', function (token, idx, type) {
          done()
        })
        p.continue()
        p.addRule('', function (token, idx, type) {
          done( new Error('Should not trigger') )
        })
        p.saveRuleSet('a')

        p.loadRuleSet('a')
        
        p.write('ab')
      }