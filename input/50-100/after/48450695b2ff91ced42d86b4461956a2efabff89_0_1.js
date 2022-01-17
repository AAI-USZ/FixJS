function() {
            var checked = this.checked;

            if (this.checked) {
                bugTrackerTypeRowEl.hide();
                bugTrackerPlanRowEl.hide();
                bugTrackerUsernameRowEl.hide();
                bugTrackerURLRowEl.hide();
                bugTrackerForms.hide();
            } else {
                bugTrackerTypeRowEl.show();
                bugTrackerTypeEl.triggerHandler('change');
            }
        }