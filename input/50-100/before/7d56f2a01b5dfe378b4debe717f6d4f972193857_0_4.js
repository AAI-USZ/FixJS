function() {
            updateFormDisplay("hosting_type", HOSTING_SERVICE_FIELDS);
            updateRepositoryType();

            var hostingType = hostingTypeEl[0].value;

            if (hostingType == "custom" ||
                BUG_TRACKER_FIELDS[hostingType] == undefined) {
                bugTrackerUseHostingEl[0].disabled = true;
                bugTrackerUseHostingEl[0].checked = false;
                bugTrackerUseHostingEl.triggerHandler("change");
            } else {
                bugTrackerUseHostingEl[0].disabled = false;
            }
        }