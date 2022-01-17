function () {
    describe('with no argument', function () {
      var p = new Tokenizer(options)
      it('should be valid', function (done) {
        assert.doesNotThrow(
          function () {
            p.continue()
          }
        , function (err) {
            if (err instanceof Error) return true
          }
        )
        done()
      })
    })

    describe('with null argument', function () {
      var p = new Tokenizer(options)
      it('should be valid', function (done) {
        assert.doesNotThrow(
          function () {
            p.continue(null)
          }
        , function (err) {
            if (err instanceof Error) return true
          }
        )
        done()
      })
    })

    describe('with null as second argument', function () {
      var p = new Tokenizer(options)
      it('should be valid', function (done) {
        assert.doesNotThrow(
          function () {
            p.continue(null, null)
          }
        , function (err) {
            if (err instanceof Error) return true
          }
        )
        done()
      })
    })

    describe('with a positive jump', function () {
      var p = new Tokenizer(options)
      it('should upon match continue at the indexed rule', function (done) {
        var i = 0
        p.continue(0)
        p.addRule('a', function (token, idx, type) {
          i++
        })
        p.continue()
        p.addRule('b', function (token, idx, type) {
          assert(i, 1)
          done()
        })
        p.write('ab')
      })
    })

    describe('with a negative jump', function () {
      var p = new Tokenizer(options)
      it('should upon match continue at the previous indexed rule', function (done) {
        var i = 0
        p.continue(-1)
        p.addRule('a', function (token, idx, type) {
          i++
        })
        p.continue()
        p.addRule(0, function (token, idx, type) {
          assert(i, 2)
          done()
        })
        p.write('aa')
      })
    })

    describe('with a positive second argument', function () {
      var p = new Tokenizer(options)
      it('should upon failure continue at the specified indexed rule', function (done) {
        var i = 0
        p.continue(null, 1)
        p.addRule('a', 'first')
        p.continue()
        p.addRule('a', function () {
          done( new Error('Shoud not trigger') )
        })
        p.addRule('b', function (token, idx, type) {
          done()
        })
        p.write('b')
      })
    })

    describe('with a negative second argument', function () {
      var p = new Tokenizer(options)
      it('should upon failure continue at the specified indexed rule', function (done) {
        var i = 0
        p.addRule('b', function (token, idx, type) {
          done()
        })
        p.continue(0)
        p.addRule('a', 'first')
        p.continue(null, -3)
        p.addRule('a', function () {
          done( new Error('Shoud not trigger') )
        })
        p.continue()
        p.write('ab')
      })
    })

    describe('while paused', function () {
      var p = new Tokenizer(options)
      it('should continue at the indexed rule', function (done) {
        p.continue(1)
        p.addRule('a', function (token, idx, type) {
          p.pause()
        })
        p.continue()
        p.addRule(' ', 'no match')
        p.addRule('b', function (token, idx, type) {
          done()
        })
        p.write('ab')
        p.resume()
      })
    })

    describe('with a string defined rule', function () {
      var p = new Tokenizer(options)
      it('should define the continue index after #saveRuleSet()', function (done) {
        var i = 0
        p.continue('end')
        p.addRule('a', 'a')
        p.continue()
        p.addRule('a', 'end')
        p.saveRuleSet('stringContinueTest')

        p.on('data', function (token, idx, type) {
          switch (type) {
            case 'a':
              if (i > 0) done(new Error('Too many calls'))
              i++
              break
            case 'end':
              p.pause()
              done()
              break
            default:
              done(new Error('Invalid type: ' + type))
          }
        })
        p.write('aaa')
      })
    })

    describe('with a function defined rule', function () {
      var p = new Tokenizer(options)
      it('should define the continue index after #saveRuleSet()', function (done) {
        function test () {
          p.pause()
          done()
        }

        var i = 0
        p.continue(test)
        p.addRule('a', 'a')
        p.continue()
        p.addRule('a', test)
        p.saveRuleSet('stringContinueTest')

        p.on('data', function (token, idx, type) {
          if (type === 'a') {
            if (i > 0) done(new Error('Too many calls'))
            i++
          }
        })
        p.write('aaa')
      })
    })
    
    describe('with an invalid rule', function () {
      var p = new Tokenizer(options)
      it('should throw', function (done) {
        assert.throws(
          function () {
            p.continue(true)
          }
        , function (err) {
            if (err instanceof Error) return true
          }
        )
        done()
      })
    })

    describe('with an invalid positive index', function () {
      var p = new Tokenizer(options)
      it('should throw on saveRuleSet()', function (done) {
        assert.throws(
          function () {
            p.continue(999)
            p.addRule(1, 'dummy')
            p.saveRuleSet('test')
          }
        , function (err) {
            if (err instanceof Error) return true
          }
        )
        done()
      })

      it('should throw on write()', function (done) {
        assert.throws(
          function () {
            p.continue(999)
            p.addRule(1, 'dummy')
            p.write('test')
          }
        , function (err) {
            if (err instanceof Error) return true
          }
        )
        done()
      })
    })

    describe('with an invalid negative index', function () {
      var p = new Tokenizer(options)
      it('should throw on saveRuleSet()', function (done) {
        assert.throws(
          function () {
            p.continue(-999)
            p.addRule(1, 'dummy')
            p.saveRuleSet('test')
          }
        , function (err) {
            if (err instanceof Error) return true
          }
        )
        done()
      })

      it('should throw on write()', function (done) {
        assert.throws(
          function () {
            p.continue(-999)
            p.addRule(1, 'dummy')
            p.write('test')
          }
        , function (err) {
            if (err instanceof Error) return true
          }
        )
        done()
      })
    })

    describe('with a rule set modified with #loadRuleSet()', function () {
      var p = new Tokenizer(options)
      it('should reset the index', function (done) {
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
      })
    })

    describe('with an initial #loadRuleSet()', function () {
      var p = new Tokenizer(options)

      it('should not reset the index', function (done) {
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
        p.addRule(1, 'dummy') // To avoid error as continue(0) is set on the last rule
        p.saveRuleSet('a')

        p.loadRuleSet('a')
        
        p.write('ab')
      })
    })

    describe('with a rule set modified with #next()', function () {
      var p = new Tokenizer(options)
      it('should reset the index', function (done) {
        p.addRule('b', function (token, idx, type) {
          done()
        })
        p.saveRuleSet('b')

        p.next('b')
        p.addRule('a', 'a')
        p.addRule('b', function (token, idx, type) {
          done( new Error('Should not trigger') )
        })
        
        p.write('ab')
      })
    })

    describe('with split data', function () {
      var p = new Tokenizer(options)
      it('should not reset the index', function (done) {
        p.continue(0)
        p.addRule('a', 'a')
        p.addRule('a', function (token, idx, type) {
          done()
        })
        
        p.write('a')
        p.write('a')
      })
    })
  }