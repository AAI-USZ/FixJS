function (status, callback) {
        gitQue.push({task: pushCommit(settings, status, callback), info: '  git:pushCommit :: ' + forkedRepo});
      }