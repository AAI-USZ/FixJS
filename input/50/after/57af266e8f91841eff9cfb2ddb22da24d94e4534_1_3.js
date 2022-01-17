function (status, callback) {
        gitQue.push({task:  remoteRename(settings, status, callback), info: '  git:remoteRename :: ' + settings.forkedRepo});
      }