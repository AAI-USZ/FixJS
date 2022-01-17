function(path, query, args, cb){
          if(cb == null){
            cb = args
          }else{
            for(var attr in args)(function(attr){
              options[attr] = args[attr]
            })(attr)
          }
          var params = sign(options)
          params["query"] = query

          var body = qs.stringify(params)
          var args = {
            "method": "POST",
            "headers": {
              "content-type": "application/x-www-form-urlencoded",
              "content-length": body.length 
            },
            "url": "https://api.dropbox.com/1/search/" + (params.root || root) + "/" + qs.escape(path),
            "body": body
          }
          return request(args, function(e, r, b){
            cb(e ? null : r.statusCode, JSON.parse(b))
          })
        }