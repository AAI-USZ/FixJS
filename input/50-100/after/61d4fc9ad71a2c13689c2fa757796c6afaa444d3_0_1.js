function onSuccess(info) {
        if (info.success) {
          pageHelpers.emailSent("waitForPasswordResetComplete", oncomplete);
        }
        else {
          var tooltipEl = info.reason === "throttle" ? "#could_not_add" : "#not_registered";
          tooltip.showTooltip(tooltipEl);
          complete(oncomplete);
        }
      }