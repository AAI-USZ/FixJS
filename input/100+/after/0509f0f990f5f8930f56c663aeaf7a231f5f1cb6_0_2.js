function(path, args, cb){
          var params = sign(options)
          if(cb == null){
            cb = args
          }else{
	      set_args(params, args);
          }

          var args = {
            "method": "GET",
            "url": "https://api-content.dropbox.com/1/files/" + (params.root || root) + "/" + qs.escape(path) + "?" + qs.stringify(params),
            "encoding": null
          }
          return request(args, function(e, r, b){
            cb(r.statusCode, b, r.headers['x-dropbox-metadata'])
          })
        }