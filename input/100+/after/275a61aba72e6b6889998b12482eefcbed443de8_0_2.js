function (outerFuture, subscription) {
  log("============== syncAssistant");
  var finishAssistant, logError, initializeCallback, syncCallback, finishCallback, checkAccountCallback, 
      f, args = this.controller.args, account = this.controller.args, accountId;
  log("Activity: " + JSON.stringify(this.controller.args.$activity));
  //log("args: " + JSON.stringify(args));
  if (args.$activity && args.$activity.trigger && args.$activity.trigger.returnValue === false) {
    log("Error with activity: " + JSON.stringify(args));
    return;
  }
  try {
    outerFutures.push(outerFuture);
    accountId = args.accountId;
    this.controller.args.$activity.accountId = accountId;
    if (!accountId) {
      accountId = "noId";
    }
    finishAssistant = function (result) {
      finishAssistant_global({name: "syncAssistant", outerFuture: outerFuture, result: result, accountId: accountId});
      logSubscription = undefined; //delete subscription.
    };
    logError = function(e) {
      logError_global(e, "syncAssistant");
      finishAssistant({finalResult: true, returnVaule: false, success: false});
    };
    //log("Params: " + JSON.stringify(this.controller.args));
    log("Future: " + JSON.stringify(outerFuture.result));
        
    if (!startAssistant({name: "syncAssistant", outerFuture: outerFuture, accountId: accountId, run: this.run.bind(this) })){
      delete outerFuture.result;
      if (subscription) {
        logSubscription = subscription; //cool, seems to work. :)
        logToApp("Sync of this account already running, connecting output to app.");
      }
      return;
    }
    
    if (!args.accountId && !args.index >= 0 && !args.name) {
      log("Need accountId or account.index or account.name to sync!");
      finishAssistant({ finalResult: true, success: false, reason: "Parameters not sufficient. " + JSON.stringify(args) });
      return;
    }

    //disable activities until we are finished with sync:
    //checkActivities({name: account.name}); //TODO: move this to initialization and wait for the callbacks to return. Here VERY wrong for activities themselfes!!! :(

    
    finishCallback = function (f) {
      if (f.result.returnValue === true) {
        log("Success, returning to client");
        finishAssistant({ finalResult: true, success: true, reason: "All went well, updates", account: account});
      } else {
        log("Failure, returning to client");
        finishAssistant({ finalResult: true, success: false, reason: "Failure in cleanup, expect trouble with next sync."});
      }
    };

    syncCallback = function (result) { 
      try {
        log("Sync came back.");
        //log("result: " + JSON.stringify(result));
        //log(JSON.stringify(result));
        if (result.success === true) {
          this.finished(account).then(this, finishCallback);
        } else {
          finishAssistant({ finalResult: true, success: false, reason: "Internal sync error." });
        }
      } catch (e) {
        logError(e);
      }
    };

    checkAccountCallback = function (f3) {
      try {
        if (f3.result.returnValue === true) {
          log("Finishing initialization of SyncML framework.");
          SyncML.initialize(account);
          delete account.datastores.contacts; //be sure to not sync contacts, yet.
          eventCallbacks.setAccountAndDatastoreIds({accountId: account.accountId, calendarId: account.datastores.calendar.dbId});
          eventCallbacks.setRevisions({calendar: account.datastores.calendar.lastRev || 0});
          SyncML.setCallbacks([
                               {
                                 name: "calendar",
                                 //needs to get all calendar data and call callback with { update: [ all data here ] }, callback
                                 getAllData: eventCallbacks.getAllEvents,
                                 //needs to get only new calendar data and call callback with { update: [modified], add: [new], del: [deleted] }, callback
                                 getNewData: eventCallbacks.getNewEvents,
                                 //this will be called on refresh from server to delete all local data. Call callback with {}.
                                 deleteAllData: eventCallbacks.deleteAllEvents,
                                 //Param: {type: add, callback, globalId: ..., item: new item data }. call callback with {type: add, globalId: ..., localId: ... success: true/false }
                                 newEntry: eventCallbacks.createEvent,
                                 //Param: {type: update, callback, localId: ..., item: new data }. Call callback with { type: update, globalId: ..., localId: ... success: true/false }.
                                 updateEntry: eventCallbacks.updateEvent,
                                 //Param: { type: del, callback, localId: ... }. Call callback with { type: del, globalId: ..., localId: ... success: true/false }. 
                                 delEntry: eventCallbacks.deleteEvent
                               }
                               ]
          );
          log("SyncML initialized.");
          logToApp("SyncML completely initialized, starting sync process.");
          SyncML.sendSyncInitializationMsg(syncCallback.bind(this));
        } else {
          log("check and creation of accounts and calendar did not work.");
          finishAssistant({ finalResult: true, success: false, reason: "Could not create/check account/calendar." });
        }
      } catch (e) {
        logError(e);
      }
    };

    initializeCallback = function (f2) {
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
          args.$activity.accountId = account.accountId;
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
    };
    
    logSubscription = subscription;
    try {
      f = initialize({devID: true, keymanager: true, accounts: true, accountsInfo: true, iCal: true});
      f.then(this, initializeCallback);
    } catch (e) { 
      logError(e);
    }
  } catch (e) {
    logError(e);
  }
}