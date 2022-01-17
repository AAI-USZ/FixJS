function () {
    describe('with a whole nvp', function () {
      var Parser = atokParser.createParserFromFile('./parsers/nvpHelperParser.js', 'options')
      var p = new Parser(options)

      it('should parse it', function (done) {
        function handler (token, idx, type) {
          switch (type) {
            case 'nvp':
              assert.deepEqual(token, { name: '_var_', value: 'value' })
            break
            default:
              done( new Error('Unknown type: ' + type) )
          }
        }

        p.on('data', handler)
        p.write('_var_="value"')
        done()
      })
    })

    describe('with a whole nvp and whitespaces', function () {
      var Parser = atokParser.createParserFromFile('./parsers/nvpHelperParser.js', 'options')
      var p = new Parser(options)

      it('should parse it', function (done) {
        function handler (token, idx, type) {
          switch (type) {
            case 'nvp':
              assert.deepEqual(token, { name: '_var_', value: 'value' })
            break
            default:
              done( new Error('Unknown type: ' + type) )
          }
        }

        p.on('data', handler)
        p.write('_var_ \n=\t"value"')
        done()
      })
    })

    describe('with a split up nvp #1', function () {
      var Parser = atokParser.createParserFromFile('./parsers/nvpHelperParser.js', 'options')
      var p = new Parser(options)

      it('should parse it', function (done) {
        function handler (token, idx, type) {
          switch (type) {
            case 'nvp':
              assert.deepEqual(token, { name: '_var_', value: 'value' })
            break
            default:
              done( new Error('Unknown type: ' + type) )
          }
        }

        p.on('data', handler)
        p.write('_var_')
        p.write('="value"')
        done()
      })
    })

    describe('with a split up nvp #2', function () {
      var Parser = atokParser.createParserFromFile('./parsers/nvpHelperParser.js', 'options')
      var p = new Parser(options)

      it('should parse it', function (done) {
        function handler (token, idx, type) {
          switch (type) {
            case 'nvp':
              assert.deepEqual(token, { name: '_var_', value: 'value' })
            break
            default:
              done( new Error('Unknown type: ' + type) )
          }
        }

        p.on('data', handler)
        p.write('_var_=')
        p.write('"value"')
        done()
      })
    })

    describe('with a split up nvp #3', function () {
      var Parser = atokParser.createParserFromFile('./parsers/nvpHelperParser.js', 'options')
      var p = new Parser(options)

      it('should parse it', function (done) {
        function handler (token, idx, type) {
          switch (type) {
            case 'nvp':
              assert.deepEqual(token, { name: '_var_', value: 'value' })
            break
            default:
              done( new Error('Unknown type: ' + type) )
          }
        }

        p.on('data', handler)
        p.write('_var_="va')
        p.write('lue"')
        done()
      })
    })

    describe('with an unquoted value', function () {
      var Parser = atokParser.createParserFromFile('./parsers/nvpHelperParser.js', 'options')
      var p = new Parser(options)

      it('should parse it', function (done) {
        function handler (token, idx, type) {
          switch (type) {
            case 'nvp':
              assert.deepEqual(token, { name: '_var_', value: 'value' })
            break
            default:
              done( new Error('Unknown type: ' + type) )
          }
        }

        p.on('data', handler)
        p.write('_var_=value ')
        done()
      })
    })

    describe('with an unquoted value and custom ending pattern', function () {
      var Parser = atokParser.createParserFromFile('./parsers/nvpHelperParser.js', 'options')
      var p = new Parser({ ending: { firstOf: '> ' } })

      it('should parse it', function (done) {
        function handler (token, idx, type) {
          switch (type) {
            case 'nvp':
              assert.deepEqual(token, { name: '_var_', value: 'value' })
            break
            default:
              done( new Error('Unknown type: ' + type) )
          }
        }

        p.on('data', handler)
        p.write('_var_= value> ')
        done()
      })
    })
  }