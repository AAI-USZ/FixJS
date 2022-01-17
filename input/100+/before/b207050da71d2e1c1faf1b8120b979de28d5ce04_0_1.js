function() {
            var hostingType = hostingTypeEl[0].value;

            updateRepositoryType();

            if (hostingType === "custom") {
                repoPlanRowEl.hide();
                repoPathRowEl.show();
                repoMirrorPathRowEl.show();
            } else {
                var planTypes = HOSTING_SERVICES[hostingType].plans,
                    accounts = HOSTING_SERVICES[hostingType].accounts,
                    i;

                hideAllToolsFields();
                repoPathRowEl.hide();
                repoMirrorPathRowEl.hide();

                repoPlanEl.empty();

                if (planTypes.length === 1) {
                    repoPlanRowEl.hide();
                } else {
                    for (i = 0; i < planTypes.length; i++) {
                        var planType = planTypes[i];

                        repoPlanEl.append($("<option/>")
                            .val(planType.type)
                            .text(planType.label));
                    }

                    repoPlanRowEl.show();
                }

                /* Rebuild the list of accounts. */
                hostingAccountEl.find('option[value!=""]').remove();

                for (i = 0; i < accounts.length; i++) {
                    var account = accounts[i],
                        opt = $("<option/>")
                            .val(account.pk)
                            .text(account.username)
                            .appendTo(hostingAccountEl);

                    if (i === 0) {
                        opt.attr("selected", "selected");
                    }
                }
            }

            repoPlanEl.triggerHandler("change");

            if (hostingType === "custom" ||
                BUG_TRACKER_FIELDS[hostingType] === undefined) {
                bugTrackerUseHostingEl[0].disabled = true;
                bugTrackerUseHostingEl[0].checked = false;
                bugTrackerUseHostingEl.triggerHandler("change");
            } else {
                bugTrackerUseHostingEl[0].disabled = false;
            }
        }