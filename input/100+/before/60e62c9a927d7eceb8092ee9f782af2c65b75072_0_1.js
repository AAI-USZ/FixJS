function() {
            var hostingType = hostingTypeEl.val();

            if (hostingType === "custom") {
                hostingAccountRowEl.hide();
                hostingAccountDetailsEls.hide();
            } else {
                hostingAccountRowEl.show();

                if (hostingAccountEl.val() === "") {
                    hostingAccountDetailsEls.show();
                } else {
                    hostingAccountDetailsEls.hide();
                }
            }
        }