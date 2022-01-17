function() {
            var hostingType = hostingTypeEl.val();

            if (hostingType === "custom") {
                hostingAccountRowEl.hide();
                hostingAccountUserRowEl.hide();
                hostingAccountPassRowEl.hide();
            } else {
                hostingAccountRowEl.show();

                if (hostingAccountEl.val() === "") {
                    hostingAccountUserRowEl.show();

                    if (HOSTING_SERVICES[hostingType].needs_authorization) {
                        hostingAccountPassRowEl.show();
                    } else {
                        hostingAccountPassRowEl.hide();
                    }
                } else {
                    hostingAccountUserRowEl.hide();
                    hostingAccountPassRowEl.hide();
                }
            }
        }