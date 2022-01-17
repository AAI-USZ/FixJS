function () {
    if(GHAuth.isSigned()) {
      // instaedit.addGithubJS(function () {
        console.log(Editors.getEditor());
        var token = GHAuth.loadTokenFromCookies();
        var url = instaedit.getContentSourceUrl();
        var data = Editors.getEditor().contentEditor.getSession().getValue();

        instaedit.displayNotification('Preparing to commit to ' + token + ' with token ' + url, 'notification', document);
        instaedit.displayNotification('Preparing to commit to ' + token + ' with token ' + url, 'notification');

        GHAuth.sendCommitRequest(data, token, url, function (res) {
          if(res == 'success') {
            instaedit.displayNotification('Committed!', 'notification', document);
          } else {
            instaedit.displayNotification('Committing failed.', 'error', document);
          }
        });
/*
        instaedit.githubCommit(Editors.getEditor().contentEditor.getSession().getValue(), GHAuth.loadTokenFromCookies(), instaedit.getContentSourceUrl(), function (res) {
          if(res != 'err') {
            instaedit.displayNotification('Succesfully commited.', 'notification');
          } else {
            instaedit.displayNotification('Unkown error occurred during commit.', 'error');
          }
        });
*/
      // });
    } else {
      GHAuth.performProcess();
    }
  }