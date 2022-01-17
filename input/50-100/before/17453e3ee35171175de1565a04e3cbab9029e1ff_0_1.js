function(user, repo, cb) {
    $.ajax({
      url: 'http://github.com/api/v2/json/commits/list/'+user+'/'+repo+'/master',
      dataType: 'jsonp',
      success: function(json) {
        var latest = json.commits[0];
        cb(latest);
      }
    });
  }