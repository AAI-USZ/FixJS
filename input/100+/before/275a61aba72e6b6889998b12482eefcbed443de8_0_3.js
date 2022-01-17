function() {
	var args = this.controller.args;
	var activity = args.$activity;
  log("============== Sync.complete");
  if (activity && activity.trigger && activity.trigger.returnValue === false && activity.account.syncInterval && activity.account.syncInterval !== "disabled") {
    log("Error with activity " + activity.name + ": " + JSON.stringify(activity.trigger));
    return;
  }
  if (activity && activity.trigger) {
    log("Sync was because: " + activity.name + " with trigger " + JSON.stringify(activity.trigger));
  }
	// log("sync complete starting, activity: " + activity.activityName);
	// if (activity && activity.trigger && activity.trigger.returnValue) { //we were run by an activity, restart it.
    // var trigger = undefined;
    // if (activity.trigger && activity.trigger.params && activity.trigger.params.query && activity.trigger.params.query.where
         // && (activity.trigger.params.query.where[1].val >= 0)) {
      // trigger = activity.trigger;
      // if (trigger.params.query.from === "info.mobo.syncml.contact:1") {
        // trigger.params.query.where[1].val = account.datastores.contacts.lastRev;
      // } else {
        // trigger.params.query.where[1].val = account.datastores.calendar.lastRev;
      // }
    // }
		// return PalmCall.call("palm://com.palm.activitymanager/", "complete", {
			// activityId: activity.activityId, //hopefully this does NOT need the trigger to be defined again...? :(
      // trigger: trigger,
			// restart: true }).then(function(f) {
				// log("sync complete completed", JSON.stringify(f.result));
				// f.result = { returnValue: true };
			// });
	// } else { //no activity yet.
		checkActivities(activity.account); //hopefully that works ok. :(
	// }
}