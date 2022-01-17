function(path, rev, args, cb){
          var params = sign(options)
          if(cb == null){
            cb = args
          }else{
	    set_args(params, args);
          }

          params["rev"] = rev

          var body = qs.stringify(params)
          var args = {
            "method": "POST",
            "headers": {
              "content-type": "application/x-www-form-urlencoded",
              "content-length": body.length
            },
            "url": "https://api.dropbox.com/1/restore/" + (params.root || root) + "/" + qs.escape(path), // + "?" + qs.stringify(params)
            "body": qs.stringify(params)
          }
          return request(args, function(e, r, b){
            cb(e ? null : r.statusCode, JSON.parse(b))
          })
        }