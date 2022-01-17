function (done) {
        p.on('data', getHandler('a"b)cd"', done))
        p.write('(a"b)c')
        p.write('d")ef')
      }