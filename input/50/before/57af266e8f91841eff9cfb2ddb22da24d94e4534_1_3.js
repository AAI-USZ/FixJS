function (status, callback) {
        gitQue.push({task:  remoteRename(repoLocation, status, callback), info: '  git:remoteRename :: ' + forkedRepo});
      }