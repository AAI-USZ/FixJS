function () {
  var props = {}
  var propNames = arguments.length > 0
        ? sliceArguments(arguments, 0)
        : this._defaultProps

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