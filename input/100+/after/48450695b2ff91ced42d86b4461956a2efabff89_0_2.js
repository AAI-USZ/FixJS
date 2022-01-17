function() {
        var plan = bugTrackerPlanEl.val() || 'default',
            bugTrackerType = bugTrackerTypeEl.val(),
            planInfo = HOSTING_SERVICES[bugTrackerType].planInfo[plan];

        updateHostingForm(bugTrackerTypeEl, "bug-tracker-form",
                          bugTrackerPlanEl, bugTrackerForms);

        if (planInfo.bug_tracker_requires_username) {
            bugTrackerUsernameRowEl.show();
        } else {
            bugTrackerUsernameRowEl.hide();
        }
    }