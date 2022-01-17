function (url) {
      var originUrl = url;
      var url = url.split('/');
      var user = url[3];
      var repo = url[4];
      var branch = url[5]

      if(url.length == 6) {
        var path = url[6];
      } else {
        var path = '';
        for(var i = 7; i <= url.length; i++) {
          path += '/' + url[i - 1];
        }
        path = path.substr(1);
      }

      var url = 'https://api.github.com/repos/' + user + '/' + repo + '/git/refs/heads/' + branch;
      jQuery.getJSON(url + "?callback=?", {}, function(data) {
        var url = 'https://api.github.com/repos/' + user + '/' + repo + '/git/trees/' + data.data.object.sha;
        jQuery.getJSON(url + "?callback=?", {recursive: 1}, function(data) {
          for(var j in data.data.tree) {
            if(path == data.data.tree[j].path) {
              var url = data.data.tree[j].url;
              jQuery.getJSON(url + "?callback=?", {recursive: 1}, function(data) {
                var data = decode64(data.data.content)
                cb(data);
              });
            }
          }
        });
      });
    }