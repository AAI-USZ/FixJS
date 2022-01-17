function(path, body, args, cb){
          var params = sign(options)
          if(cb == null){
            cb = args
          }else{
	      set_args(params, args);
          }

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