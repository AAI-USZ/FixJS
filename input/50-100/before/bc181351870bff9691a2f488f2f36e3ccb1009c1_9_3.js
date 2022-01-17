function(msg, info) {
      self.newUserEmail = info.email;

      // Add new_account to the KPIs *before* the staging occurs allows us to
      // know when we are losing users due to the email verification.
      mediator.publish("kpi_data", { new_account: true });

      // cancel is disabled if the user is doing the initial password set
      // for a requiredEmail.
      info.cancelable = !requiredEmail;
      startAction(false, "doSetPassword", info);
    }