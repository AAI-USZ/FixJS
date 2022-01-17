function (data, code, url, cb) {
    var url = url.replace('https://', '').replace('raw.github.com/', '').split('/');
    var username = url[0];
    var repoName = url[1];
    var branch = url[2];
    
    var path = '';
    for (var i in url) {
      if(i > 2) {
        path += url[i] + '/';
      }
    };


    console.log('User: ' + username + ', Repo: ' + repoName + ', Branch: ' + branch + ', Path: ' + path);
    githubJS(username);
    
    var user = gh.user(username);
    var message = 'Content update of ' + path.split('/')[path.split('/').length - 2] + ' - comitted from web with Instaedit.';
    var repo = gh.repo(user, repoName);

    var url = 'https://api.github.com/repos/' + username + '/' + repoName + '/git/refs/heads/' + branch;
    jQuery.getJSON(url + "?callback=?", {}, function(response) {
      postData = {};
      postData.login = username;
      postData.token = code;
      postData.parent_commit = response.data.object.sha;
      postData.message = message;
      
      postData.content = {};
      postData.content.path = path;
      postData.content.mode = 'edit';
      postData.content.data = data;

      console.log(JSON.stringify(postData));

      var url = 'https://api.github.com/repos/' + username + '/' + repoName + '/git/commits/';

      /*
       *  post(url, JSON.stringify(postData));
       *  TODO Returning 404
       *   -> http://swanson.github.com/blog/2011/07/23/digging-around-the-github-api-take-2.html
       */

      cb();
    });
  }