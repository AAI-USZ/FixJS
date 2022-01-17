function error (con) { 
      var err = new Error('contract failed: ' 
        + abbrev(con.function) 
        + ' '
        + rangeDesc(min, max)
        + ', but was called ' + con.called + plural(con.called) + '.'
      )
      err.type = 'contract'
      throw err 
    }