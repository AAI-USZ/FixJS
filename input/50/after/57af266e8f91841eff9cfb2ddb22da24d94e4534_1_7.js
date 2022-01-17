function (status, callback) {
        gitQue.push({task:  remoteAddForkedOrigin(settings, status, callback), info: '  git:remoteAddForkedOrigin :: ' + forkedRepo});
      }