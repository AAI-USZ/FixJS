function (min, max) {
    if(min != null && max != null)
      if (min > max) throw new Error('min must be smaller than max')
   var err = new Error()
   function error (con) {
      err.message = (
        'broke contract: ' 
        + abbrev(con) 
        + ' '
        + rangeDesc(min, max)
        + ', but was '
        + ( con.called === 0 
          ? 'not called.'
          : 'called ' + con.called + plural(con.called) + '.'
        )
        + '\ncontract defined at:'
      )
      err.type = 'contract'
      throw err 
    }

   return {
    //soft validation, triggered before the
    id: 'isCalled',
    before: function (args) {
      //soft validation. fail if a call was 
      //against the rule.
      if(max != null && this.called > max)
        error(this)
    },
    validate: function () {
      //hard check against the contract.
      //triggered manually, or on process.exit.
      if(!between(this.called, min, max))
        error(this)
    },
    update: function (_min, _max, change) {
      if(change) { 
          min == null || (min += change)
          max == null || (max += change)
      } else 
        min = _min; max = _max

      if(max != null && this.called > max)
        error(this)
    }
  }
}