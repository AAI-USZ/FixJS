function (status, callback) {
        gitQue.push({task: pushCommit(forkedRepo, repoLocation, status, callback), info: '  git:pushCommit :: ' + forkedRepo});
      }