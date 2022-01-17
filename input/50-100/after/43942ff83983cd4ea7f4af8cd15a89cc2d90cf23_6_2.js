function (done) {
          init(["atok.quiet(true)"].concat(data), helper)
          p.write(helperData)
          p.write(' ')
          assert(found)
          assert.equal(
            typeof dataFound === 'number'? dataFound : dataFound.length
          , expectedData.hasOwnProperty('length')
              ? expectedData.length
              : helperData.length + 1
          )
          done(err)
        }