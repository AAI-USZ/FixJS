function() {
            var checked = this.checked;

            bugTrackerTypeEl[0].disabled = checked;

            forEachField(BUG_TRACKER_FIELDS, true, function(el) {
                el[0].disabled = checked;
            });

            updateFormDisplay("bug_tracker_type", BUG_TRACKER_FIELDS);
        }