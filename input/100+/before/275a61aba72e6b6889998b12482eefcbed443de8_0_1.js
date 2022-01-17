function (f2) {
      if (f2.result.returnValue === true) {
        log("initialize.result: " + JSON.stringify(f2.result));
        
        log("Starting sync");
        if (account && account.accountId) {
          account = SyncMLAccount.getAccountById(account.accountId);
        } else if (account.index >= 0) {
          account = SyncMLAccount.getAccount(account.index);
        } else if (account.name) {
          account = SyncMLAccount.getAccountByName(account.name);
        }
        if(args.$activity) {
          args.$activity.account = account;
        }

        
        if(!account.username || !account.password || !account.url) {
          log("Account seems to be not fully configured. Can't sync.");
          log("Account: " + JSON.stringify(account));
          finishAssistant({ finalResult: true, success: false, reason: "Account not fully configured: " + JSON.stringify(account) });
          return;
        }

        this.checkAccount(account).then(this, checkAccountCallback);
      } else {
        log("Initialization failed... :(");
        finishAssistant({ finalResult: true, success: false, reason: "Initialization failed." });
      }
      //return future;
    }