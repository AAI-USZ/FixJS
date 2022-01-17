function(from_path, to_path, args, cb){
          var params = sign(options)
          if(cb == null){
            cb = args
          }else{
	    set_args(params, args);
          }
          params["root"] = params.root || root
          params["from_path"] = from_path
          params["to_path"] = to_path

          var args = {
            "method": "POST",
            "headers": { "content-type": "application/x-www-form-urlencoded" },
            "url": "https://api.dropbox.com/1/fileops/move",
            "body": qs.stringify(params)
          }

          return request(args, function(e, r, b){
            cb(e ? null : r.statusCode, JSON.parse(b))
          })
        }