function(c) {
    test.assert(c.name === 'c', 'c is ok')

    document.cookie = 'seajs=1``1; path=/; expires=' + new Date(0)
    test.done()
  }