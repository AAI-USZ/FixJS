function(c) {
    test.assert(c.name === 'c', 'c is ok')

    document.cookie = 'seajs=0``0; path=/; expires=' + new Date(0)
    test.done()
  }