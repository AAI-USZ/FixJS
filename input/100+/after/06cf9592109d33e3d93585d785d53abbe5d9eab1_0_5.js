function(path, args, cb){
          var params = sign(options)
          if(cb == null){
            cb = args
          }else{
	    set_args(params, args);
          }

          var args = {
            "method": "GET",
            "url": "https://api.dropbox.com/1/revisions/" + (params.root || root) + "/" + qs.escape(path) + "?" + qs.stringify(params)
          }
          return request(args, function(e, r, b){
            cb(e ? null : r.statusCode, JSON.parse(b))
          })
        }