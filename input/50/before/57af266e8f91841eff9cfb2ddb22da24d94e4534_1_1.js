function (status, callback) {
        gitQue.push({task: switchBranch(forkedRepo, repoLocation, status, callback), info: 'git:switchBranch :: ' + forkedRepo});
      }