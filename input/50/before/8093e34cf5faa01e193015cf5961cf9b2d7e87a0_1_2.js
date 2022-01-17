function fail(con, oCon) {
  var err = new Error('contract failed: '
    + abbrev(con.function)
    + ' *must* be called before '
    + abbrev(oCon.function)
    + ' but it was called after'
  )
  err.type = 'contract'
  throw err
}