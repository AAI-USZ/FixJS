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