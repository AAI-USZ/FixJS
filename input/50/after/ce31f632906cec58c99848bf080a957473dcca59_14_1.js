function (authenticated) {
        if (authenticated) {
          self.publish("authentication_success");
        }
        else {
          self.publish("authentication_fail");
          tooltip.showTooltip("#cannot_authenticate");
        }
        complete(callback, authenticated);
      }