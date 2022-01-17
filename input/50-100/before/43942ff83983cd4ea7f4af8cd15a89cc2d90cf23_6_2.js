function (done) {
          init(["atok.quiet(true)"].concat(data), helper)
          p.write(helperData)
          p.write(' ')
          assert(found)
          assert.equal(typeof dataFound === 'number' ? dataFound : dataFound.length, expectedData.length)
          done(err)
        }