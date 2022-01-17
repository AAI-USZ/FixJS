function(response) {
      postData = {};
//    postData.login = username;
//    postData.token = code;
      postData.parent_commit = response.data.object.sha;
      postData.message = message;
      
      postData.content = {};
      postData.content.path = path;
      postData.content.mode = 'edit';
      postData.content.data = data;

      console.log(JSON.stringify(postData));

      var url = 'http://github.com/api/v2/json/' + username + '/' + repoName + '/git/commits/';
/*
      _request('POST', url, postData, code, function (err, res) {
        console.log('res');
        console.log(err.toString());
        console.log(err);
        console.log(res);
        cb();
      })
*/
      /*
      *  TODO Returning 404
       *   -> http://swanson.github.com/blog/2011/07/23/digging-around-the-github-api-take-2.html
       */

       var blobData = {};
       blobData.content = data;
       blobData.encoding = 'utf-8';
       // Create blob
       var url = 'http://github.com/api/v2/json/repos/' + username + '/' + repoName + '/git/blobs';
/*
       _request('POST', url, blobData, code, function (err, res) {
          console.log('res');
          console.log(err.toString());
          console.log(err);
          console.log(res);
        });
*/

        var github = new Github({
          token: code,
          username: username,
          auth: "oauth"
        });
    
        var user = github.getUser(username);
        var repo = new Github.Repository({user: username, name: repoName});

        repo.write(branch, path, data, message, response.data.object.sha, function (res) {
          console.log(res);
        });
    }