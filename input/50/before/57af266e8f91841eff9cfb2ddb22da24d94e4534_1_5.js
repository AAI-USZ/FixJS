function (status, callback) { //We will now fork if there were changes
        forkRepo(link, forkedRepo, options.username, user, repo, repoLocation, status, callback);
      }