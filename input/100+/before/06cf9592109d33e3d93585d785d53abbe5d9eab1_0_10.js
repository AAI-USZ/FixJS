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
            "url": "https://api.dropbox.com/1/copy_ref/" + (params.root || root) + "/" + qs.escape(path) + "?" + qs.stringify(params)
          }
          return request(args, function(e, r, b){
            cb(e ? null : r.statusCode, JSON.parse(b))
          })
        }