function (status, callback) {
        gitQue.push({task: commitRepo(link, forkedRepo, repoLocation, status, callback), info: '  git:commitRepo :: ' + forkedRepo});
      }