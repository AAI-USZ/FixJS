function (done) {
        var i = 0
        p.break(true).continue(0)
        p.addRule('a', function (token, idx, type) {
          i++
          p.addRuleFirst('a', function (token, idx, type) {
          })
        })
        p.break().continue()
        p.addRule(1, 'dummy') // To avoid error as continue(0) is set on the last rule
        p.write('a')
        p.write('a')
        assert.equal(i, 2)
        done()
      }