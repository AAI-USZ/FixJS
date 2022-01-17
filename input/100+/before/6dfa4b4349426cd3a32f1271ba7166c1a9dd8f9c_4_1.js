function () {
  var props = {
    offset: isNumber
  , offsetBuffer: isNumber
  , length: isNumber
  , buffer: isString
  , writable: isBoolean
  , readable: isBoolean
  , ending: isBoolean
  , currentRule: function (v) { return v === null || isString(v) }
  }

  function isNumber () {
    return typeof arguments[0] === 'number'
  }
  function isString () {
    return typeof arguments[0] === 'string'
  }
  function isBoolean () {
    return typeof arguments[0] === 'boolean'
  }

  var p = new Tokenizer

  Object.keys(props).forEach(function (prop) {
    describe('.' + prop, function () {
      it('should exist', function (done) {
        var check = props[prop]

        assert( check( p[prop] ) )
        done()
      })
    })
  })
}