function (authenticated) {
        if (!authenticated) {
          tooltip.showTooltip("#cannot_authenticate");
        }
        complete(callback, authenticated);
      }