function() {
        var value = $(this).val();

        if (!hostingProjectNameDirty) {
            hostingProjectNameEl.val(value);
        }

        if (!bugTrackerProjectNameDirty) {
            bugTrackerProjectNameEl.val(value);
        }
    }