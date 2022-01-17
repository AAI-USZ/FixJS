function () {
  var props = {}

  // Default properties
  var defaultProps = Object.keys(this)
    .filter(function (prop) {
      return prop.substr(0, 3) === '_p_' && !/_p_(continueOnFail|nextIndex)/.test(prop)
    })
    .map(function (prop) {
      return prop.substr(3)
    })

  var propNames = arguments.length > 0 ? sliceArguments(arguments, 0) : defaultProps

  for (var prop, i = 0, num = propNames.length; i < num; i++) {
    prop = propNames[i]
    if ( this.hasOwnProperty('_p_' + prop) )
      switch (prop) {
        // Special case: continue has 2 properties
        case 'continue':
          props[ prop ] = [ this._p_continue, this._p_continueOnFail ]
        break
        // Special case: next has 2 properties
        case 'next':
          props[ prop ] = [ this._p_next, this._p_nextIndex ]
        break
        default:
          props[ prop ] = this[ '_p_' + prop ]
      }
  }

  return props
}