function(path, args, cb){
          var params = sign(options);
          if(cb == null){
            cb = args
          }else{
	    set_args(params, args);
          }
          var args = {
            "method": "GET",
            "url": "https://api.dropbox.com/1/metadata/" + (params.root || root) + "/" + qs.escape(path) + "?" + qs.stringify(params)
          }
          return request(args, function(e, r, b){
            // this is a special case, since the dropbox api returns a
            // 304 response with an empty body when the 'hash' option
            // is provided and there have been no changes since the
            // hash was computed
            cb(e ? null : r.statusCode, r.statusCode == 304 ? {} : JSON.parse(b))
          })
        }