function() {
            var bugTrackerType = bugTrackerTypeEl[0].value;

            bugTrackerForms.hide();

            if (bugTrackerType === 'custom') {
                bugTrackerPlanRowEl.hide();
                bugTrackerUsernameRowEl.hide();
                bugTrackerURLRowEl.show();
            } else if (bugTrackerType === 'none') {
                bugTrackerPlanRowEl.hide();
                bugTrackerUsernameRowEl.hide();
                bugTrackerURLRowEl.hide();
            } else {
                bugTrackerURLRowEl.hide();
                updatePlanEl(bugTrackerPlanRowEl, bugTrackerPlanEl,
                             bugTrackerType);
            }
        }