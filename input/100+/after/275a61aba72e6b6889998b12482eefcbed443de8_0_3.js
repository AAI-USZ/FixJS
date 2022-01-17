function() {
	var args = this.controller.args;
	var activity = args.$activity;
  var account = SyncMLAccount.getAccountById(activity.accountId);
  log("============== Sync.complete");
  log("Activity was: " + JSON.stringify(activity));
  if (activity && activity.trigger && activity.trigger.returnValue === false) {
    log("Error with activity " + activity.name + ": " + JSON.stringify(activity.trigger));
    return;
  }
  if (activity && activity.trigger && activity.trigger.returnValue) {
    var trigger = undefined;
    if (activity.name === "info.mobo.syncml:" + account.name + ".watchCalendar") {
      trigger = { method: "palm://com.palm.db/watch", key: "fired",
            params: { subscribe: true, query: {
                from: "info.mobo.syncml.calendarevent:1",  //it's necessary that the comparison with _rev is at index 1 to update the rev value in complete.
                where: [ {prop: "accountId", op: "=", val: account.accountId}, { prop: "_rev", op: ">", val: account.datastores.calendar.lastRev || 0 } ],	incDel: true}}};
    } else if (activity.name === "info.mobo.syncml:" + account.name + ".watchContacts") {
      trigger = { method: "palm://com.palm.db/watch", key: "fired",
              params: { subscribe: true, query: {
                from: "info.mobo.syncml.contact:1", //it's necessary that the comparison with _rev is at index 1 to update the rev value in complete.
                where: [ {prop: "accountId", op: "=", val: account.accountId}, { prop: "_rev", op: ">", val: account.datastores.contacts.lastRev || 0 } ],	incDel: true}}};
    }
    return PalmCall.call("palm://com.palm.activitymanager/", "complete", { activityId: activity.activityId, trigger: trigger, restart: true }).then(function (f) {
      log("activity restarted: ", JSON.stringify(f.result));
      f.result = { returnValue: true };
    });
  } else {
    //checkActivities(activity.account); //hopefully that works ok. :(
  }
}