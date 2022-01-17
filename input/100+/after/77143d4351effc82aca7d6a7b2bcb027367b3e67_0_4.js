function updatePieStats() {
        if (selectedArc !== undefined && selectedArc !== null) {
            if ($("g.arc path.selected").length === 0) {
                // This is no longer one of the top interests in the user
                // profile.
                selectedArc = undefined;
                pieStatsInterest.text("");
                pieStatsWeight.text("");
            } else {
                selectedArc.each(function (d) {
                    pieStatsWeight.text(d.value + "%");
                });
            }
        }
    }