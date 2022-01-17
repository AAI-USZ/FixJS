function(path, body, args, cb){
          if(cb == null){
            cb = args
          }else{
            for(var attr in args)(function(attr){
              options[attr] = args[attr]
            })(attr)
          }
          var params = sign(options)
          var args = {
            "method": "PUT",
            "headers": { "content-length": body.length },
            "url": "https://api-content.dropbox.com/1/files_put/" + (params.root || root) + "/" + qs.escape(path) + "?" + qs.stringify(params),
            "body": body 
          }
          return request(args, function(e, r, b){
            cb(e ? null : r.statusCode, JSON.parse(b))
          })
        }