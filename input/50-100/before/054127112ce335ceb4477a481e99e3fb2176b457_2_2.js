function (l, r) {
    var parentDir = r[3]
      , parent = r[2]
      , where = r[1]
      , what = r[0]
    l[where] = { parentDir: parentDir
               , parent: parent
               , children: []
               , where: where
               , what: what }
    return l
  }, {}