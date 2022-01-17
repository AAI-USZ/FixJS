function fail(con, oCon) {
  var err = new Error('contract failed: '
    + abbrev(con)
    + ' *must* be called before '
    + abbrev(oCon)
    + ' but it was called after'
  )
  err.type = 'contract'
  throw err
}