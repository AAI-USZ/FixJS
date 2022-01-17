function () {
      var p = new Tokenizer(options)

      var triggered = false

      p.ignore(true).addRule(1, 'consume').ignore()
      p.continue(0)
      p.addRule(0, function () {})
      p.continue()
      p.addRule('a', function () {
        triggered = true
      })
    
      it('should trigger and load the rule set', function (done) {
        p.write('a')
        assert(!triggered)
        assert.equal(p.length, 0)
        p.write('a')
        assert(triggered)
        done()
      })
    }