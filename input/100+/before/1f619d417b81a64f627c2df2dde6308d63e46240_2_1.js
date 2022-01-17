function(response) {
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
    }