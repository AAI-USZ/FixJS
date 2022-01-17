function (account) {
  if (account && account.syncInterval && account.syncInterval !== "disabled") {
    try {
    var activityType = 	{
                //foreground: true,
                background: true, //try background. Idea: user does something in calendar, and as soon as she finishes, push that to server.
                //immediate: true,
                //priority: "low",
                pausable: false, //we don't like to be paused, after all that is communication with the server. :(
                cancellable: false, //that is even worse!
                power: true, //do we really need that?
                powerDebounce: true,
                explicit: true, //let's try it this way.. hm.
                persist: true //we want to keep that activity around!
              };
    var activityCallback = 	{
                  method: "palm://info.mobo.syncml.client.service/sync",
                  params: { accountId: account.accountId } //prevent password and so on from being stored in another DB. AccountID is sufficient here.
                };

    log("Account.datastores: " + JSON.stringify(account.datastores));                
    
    //calendar watch:
    PalmCall.call("palm://com.palm.activitymanager/", "cancel", { activityName: "info.mobo.syncml:" + account.name + ".watchCalendar" }).then(function(f) {
      log("Cancelled Calendar Watch activity for " + account.name + ".");
      if (!account.datastores.calendar || !account.datastores.calendar.enabled || !account.dbWatch) {
        log("Calendar watch activity not necessary, all ok.");
      } else {
        var activityCal = {
            name: "info.mobo.syncml:" + account.name + ".watchCalendar",
            description: "Synergy SyncML calendar changes Watch",
            type: activityType,
            requirements: {
              internet: true
            },
            trigger: { method: "palm://com.palm.db/watch", key: "fired",
              params: { subscribe: true, query: {
                  from: "info.mobo.syncml.calendarevent:1",  //it's necessary that the comparison with _rev is at index 1 to update the rev value in complete.
                  where: [ {prop: "accountId", op: "=", val: account.accountId}, { prop: "_rev", op: ">", val: account.datastores.calendar.lastRev || 0 } ],	incDel: true}}},
            callback: activityCallback
        };
        log("(Re-)Adding calendar-Watch activity");
        PalmCall.call("palm://com.palm.activitymanager/", "create", { start: true, activity: activityCal }).then(function (f1) {
          log("WatchCalendar Sync for " + account.name + " created.");
          log(JSON.stringify(f1.result));
        });
      }
    });
    
    //contacts watch:
    PalmCall.call("palm://com.palm.activitymanager/", "cancel", { activityName: "info.mobo.syncml:" + account.name + ".watchContacts" }).then(function(f) {
      log("Cancelled Contacts Watch activity for " + account.name + ".");
      if (!account.datastores.contacts || !account.datastores.contacts.enabled || !account.dbWatch) {
        log("Contact watch activity not necessary, all fine.");
      } else {
        log("Adding contacts-Watch activity");
        var activityCon = {
            name: "info.mobo.syncml:" + account.name + ".watchContacts",
            description: "Synergy SyncML contact changes Watch",
            type: activityType,
            requirements: {
              internet: true
            },
            trigger: { method: "palm://com.palm.db/watch", key: "fired",
                params: { subscribe: true, query: {
                  from: "info.mobo.syncml.contact:1", //it's necessary that the comparison with _rev is at index 1 to update the rev value in complete.
                  where: [ {prop: "accountId", op: "=", val: account.accountId}, { prop: "_rev", op: ">", val: account.datastores.contacts.lastRev || 0 } ],	incDel: true}}},
            callback: activityCallback
        };
        PalmCall.call("palm://com.palm.activitymanager/", "create", { start: true, activity: activityCon }).then(function (f1) {
          log("WatchContacts Sync for " + account.name + " created.");
          log(JSON.stringify(f1.result));
        });
      }
    });
    
    //periodic sync:
    PalmCall.call("palm://com.palm.activitymanager/", "cancel", { activityName: "info.mobo.syncml:" + account.name + ".periodic" }).then(function(f) {
      log("Cancelled periodic Watch activity for " + account.name + ".");
      if ((account.datastores.calendar && account.datastores.calendar.enabled) || 
          (account.datastores.calendar && account.datastores.calendar.enabled)) {
        log("Adding periodic activity");
        var activityPeriod = {
            name: "info.mobo.syncml:" + account.name + ".periodic",
            description: "Synergy SyncML periodic sync",
            type: activityType,
            requirements: {
              internet: true
            },
            schedule: { interval: account.syncInterval },
            callback: activityCallback
        };
        PalmCall.call("palm://com.palm.activitymanager/", "create", { start: true, activity: activityPeriod }).then(function (f1) {
          log("Periodic Sync for " + account.name + " created.");
          log(JSON.stringify(f1.result));
        });
      } else {
        log("Not doing anything, do not need periodic activity.");
      }
    });

    log("Create activity callbacks called.");
    } catch (e) {
      log("Error in createAcitivities: " + e);
    }
  } else {
    log("Automatic Sync not activated.");
    PalmCall.call("palm://com.palm.activitymanager/", "cancel", { activityName: "info.mobo.syncml:" + account.name + ".watchCalendar" }).then(function(f) {
      log("Cancelled Calendar Watch activity for " + account.name + ".");
    });
    PalmCall.call("palm://com.palm.activitymanager/", "cancel", { activityName: "info.mobo.syncml:" + account.name + ".watchContacts" }).then(function(f) {
      log("Cancelled Contacts Watch activity for " + account.name + ".");
    });
    PalmCall.call("palm://com.palm.activitymanager/", "cancel", { activityName: "info.mobo.syncml:" + account.name + ".periodic" }).then(function(f) {
      log("Cancelled periodic Watch activity for " + account.name + ".");
    });
  }
}