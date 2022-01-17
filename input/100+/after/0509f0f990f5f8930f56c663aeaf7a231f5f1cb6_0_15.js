function(path, args, cb){
          var params = sign(options)
          if(cb == null){
            cb = args
          }else{
	    set_args(params, args);
          }
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