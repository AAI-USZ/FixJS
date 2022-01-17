function(args, cb){
          var params = sign(options)
          if(cb == null){
            cb = args
          }else{
	    set_args(params, args);
          }
          var args = {
            "method": "POST",
            "headers": { "content-type": "application/x-www-form-urlencoded" },
            "url": "https://api.dropbox.com/1/delta",
            "body": qs.stringify(params)
          }
          return request(args, function(e, r, b){
            cb(e ? null : r.statusCode, JSON.parse(b))
          })
        }