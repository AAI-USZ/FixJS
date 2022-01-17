function(path, args, cb){
          if(cb == null){
            cb = args
          }else{
            for(var attr in args)(function(attr){
              options[attr] = args[attr]
            })(attr)
          }
          var params = sign(options)
          var args = {
            "method": "GET",
            "url": "https://api-content.dropbox.com/1/thumbnails/" + (params.root || root) + "/" + qs.escape(path) + "?" + qs.stringify(params),
            "encoding": null
          }
          return request(args, function(e, r, b){
            cb(e ? null : r.statusCode, b, r.headers['x-dropbox-metadata'])
          })
        }