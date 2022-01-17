function (err, data) {
      if (err) res.send(err, 500)
      else  {
        var referer = sanitize(req.header('Referer').split('//')[1].split('?')[0]),
            reqSess = req.param('session'),
            session = typeof reqSess === 'string' ? sanitize(reqSess) : req.param('from') + '-' + req.param('to'),

            options = {
              host: 'gamma.firebase.com',
              port: 80,
              path: '/bsgbryan/aioim/' + referer + session + '.json',
              method: 'POST'
            },
            
            post = http.request(options, function (resp) {
              resp.on('end',   function()   { res.send()       })
              resp.on('error', function (e) { res.send(e, 500) })
            })

        post.write(JSON.stringify(deleteIDs(data)))
        post.end()
      }
    }