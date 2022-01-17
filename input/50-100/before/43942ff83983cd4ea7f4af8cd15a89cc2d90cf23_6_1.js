function (done) {
          data.splice(1, 0, "atok.continue()")
          data = [
              "atok.trim().continue(1).addRule('***', 'test').continue()"
            , "atok.addRule('***', 'testOne').continue(-2)"
            ].concat(data)
          init(data, helper)
          p.write('***')
          assert(testFound)
          testFound = false
          p.write(helperData)
          p.write('***')
          assert(found)
          assert(!testFound)
          done(err)
        }