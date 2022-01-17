function (link, username, user, repo, status, cb) {
    if (status === 'DONE') {
      return cb(null, 'DONE');
    } else if (!options.makePullRequest) {
      self.log.debug('options.makePullRequest not set or false, skipping pull request.');
      return cb(null, 'DONE');
    }

    github_token_ct -= 1;
    var url = 'https://api.github.com/repos/' + user + '/' + repo + '/pulls?access_token=' + github_token,
        payload = JSON.stringify({
      "title": options.gitPullRequestMessageTitle,
      "body" : options.gitPullRequestMessage,
      "base" : "master",
      "head" : options.username + ":clean"
    });

    /*
    var client   = github.client(github_token);
    github_token_ct -= 1;

    client.repo(options.username + '/' + repo).create_pull_request_comment(
      'id', /// -> is this right?
      payload,
      function (err, data) {
        //TODO (if octonode ever implements)
      });*/
    self.log.debug('Attempting to make Pull Request to:\n' + url.green + ' with the following payload:\n\n ' + payload.cyan.bold);
    request.post({url: url, body: payload}, function (error, response, body) {
            if (!error && response.statusCode === 201) {//Status: 201 Created
              self.log.info('Pull Request to ' + user + '/' + repo + ' from ' + options.username + '/' + repo + ' Succesfull!');
              options.dbAddComplete(link);

              return cb(null, 'OK');
            } else {
              if (error === null) {
                try {
                  throw new Error(response.statusCode + ' ' + response.body.toString());
                }catch (err) {
                  self.log.error('submitPullRequest::error : ' + err);
                  return cb(null, 'DONE');
                }
              } else {
                //return cb(error);
                return cb(null, 'DONE');
              }
            }
          });
  }