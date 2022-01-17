function (res) {
            _res = res
            res.setEncoding('utf8');
            res.on('data', function (chunk) { 
              parser.parse(chunk) 
            })
          }