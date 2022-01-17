function(user, repo, cb) {
    $.ajax({
      url: 'https://api.github.com/repos/'+user+'/'+repo+'/commits',
      dataType: 'jsonp',
      success: function(json) {
        var latest = json.data[0];
        cb(latest);
      }
    });
  }