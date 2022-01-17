function (done) {
        p.on('data', getHandler('a"b)cd"', done))
        p.debug(console.log)
        // console.log(p.atok._rules)
        p.write('(a"b)c')
        console.log('___')
        p.write('d")ef')
      }