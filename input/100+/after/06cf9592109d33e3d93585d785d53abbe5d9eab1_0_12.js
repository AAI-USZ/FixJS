function(from_path, to_path, args, cb){
          var from_param_key = "from_path";
          var params = sign(options)
          if(cb == null){
            cb = args
          }else{
	    set_args(params, args);
	    if (params.hasOwnProperty('from_copy_ref')) {
		delete params['from_copy_ref'];
		from_param_key = 'from_copy_ref';
	    }
          }
          params["root"] = params.root || root
          params[from_param_key] = from_path
          params["to_path"] = to_path
          var args = {
            "method": "POST",
            "headers": { "content-type": "application/x-www-form-urlencoded" },
            "url": "https://api.dropbox.com/1/fileops/copy",
            "body": qs.stringify(params)
          }
          return request(args, function(e, r, b){
            cb(e ? null : r.statusCode, JSON.parse(b))
          })
        }