function(path, args, cb){
          if(cb == null){
            cb = args
          }else{
            for(var attr in args)(function(attr){
              options[attr] = args[attr]
            })(attr)
          }
          var params = sign(options)
          params["root"] = params.root || root
          params["path"] = path
          var args = {
            "method": "POST",
            "headers": { "content-type": "application/x-www-form-urlencoded" },
            "url": "https://api.dropbox.com/1/fileops/create_folder",
            "body": qs.stringify(params)
          }
          return request(args, function(e, r, b){
            cb(e ? null : r.statusCode, JSON.parse(b))
          })
        }