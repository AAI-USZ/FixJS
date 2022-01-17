function api(path, method, params, callback) {
    // Curry arguments to allow multiple forms:
    // api(path, callback)
    // api(path, method, callback)
    // api(path, params, callback)
    // api(path, method, params, callback)
    if (callback === undefined) {
      if (params === undefined) {
        callback = method;
        method = undefined;
      } else {
        callback = params;
        if (typeof method == 'string')
          params = undefined;
        else {
          params = method;
          method = undefined;
        }
      }
    }

    if (!FBWorld.state('connected')) {
      callback(apiUnconnectedMessage());
      return;
    }

    if(/\/me\/friends(\?.*)?/.test(path)) { // /me/friends?limit=100
      callback({data:FBWorld.friendList()});
    } else if(/\/me\/permissions(\?.*)?/.test(path)) { // /me/permissions
      var theState = FBWorld.state();
      var perms;
      if (theState && theState.perms && theState.perms.data)
        perms = {data:[theState.perms.data]};
      callback(perms);
    } else if(/\/.+\/feed/.test(path) && method == 'post') { // /me/feed or /123/feed
      FBWorld.posted({path: path, params: params});
      callback({id: randomPostId()});
    } else if(/\/me\/.+:.+/.test(path) && method == 'post') {
      FBWorld.posted({path: path, params: params});
      callback({id: randomPostId()});
    } else if (/\//.test(path) && method == 'post') { // / for batch api updates
      var result = [];
      for(var i=0; i<params.batch.length; i++) {
        var batchItem = params.batch[i];
        result.push(
          {
            "code":200,
            "headers":[
            {
              "name":"Access-Control-Allow-Origin",
              "value":"*"
            },{
              "name":"Cache-Control",
              "value":"private, no-cache, no-store, must-revalidate"
            },{
              "name":"Connection",
              "value":"close"
            },{
              "name":"Content-Type",
              "value":"text\/javascript; charset=UTF-8"
            },{
              "name":"Expires",
              "value":"Sat, 01 Jan 2000 00:00:00 GMT"
            },{
              "name":"Pragma",
              "value":"no-cache"
            }],
            "body":"{\n   \"id\": \"" + batchItem.relative_url.match("/(.*)/feed")[1] +'_'+randomPostId()+"\"\n}"
          }
        );
      }
      callback(result)
    } else {
      callback(apiFailMessage(path));
    }
  }