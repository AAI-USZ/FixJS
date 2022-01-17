function (request, response) {
        var index
          , req = request.params[0]
          , place = app.set('public') + req
        if (!existsSync(place)) {
          response.statusCode = 404
          return this.render(response, '404')
        }
        if (!fs.statSync(place).isDirectory()) {
          if (fs.statSync(index = place.replace(/\/*$/, '') + '/index.html')) {
            return response.send(cache.get(index) || cache.set(fs.readFileSync(index)))
          }
          return
        }
        var files = v(fs.readdirSync(app.set('public') + req))
          .map(function (f) {
            return '<a href="' + f + '">' + f + '</a>'
          })
        this.render(response, 'directory', {
          directory: req
        , files: files
        })
      }