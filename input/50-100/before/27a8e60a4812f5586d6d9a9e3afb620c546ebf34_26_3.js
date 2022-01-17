function(status) {
        equal(status, true, "on proper completion, status is true");
        equal(tooltip.shown, false, "on proper completion, tooltip is not shown");

        equal($("#old_password").val(), "", "old_password field is cleared");
        equal($("#new_password").val(), "", "new_password field is cleared");

        start();
      }