function (status, callback) {
        gitQue.push({task: switchBranch(settings, status, callback), info: 'git:switchBranch :: ' + settings.forkedRepo});
      }