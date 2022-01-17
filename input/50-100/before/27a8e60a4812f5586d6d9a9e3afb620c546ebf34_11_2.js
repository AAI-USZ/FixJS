function(msg, info) {
      self.newUserEmail = info.email;

      // Add new_account to the KPIs *before* the staging occurs allows us to
      // know when we are losing users due to the email verification.
      mediator.publish("kpi_data", { new_account: true });

      _.extend(info, {
        // cancel is disabled if the user is doing the initial password set
        // for a requiredEmail.
        cancelable: !requiredEmail,

        // New users in the requiredEmail flow are sent directly to the
        // set_password screen.  If this happens, they have not yet seen the
        // TOS/PP agreement.

        // Always show the Persona TOS/PP to new requiredEmail users.
        personaTOSPP: !!requiredEmail,

        // The site TOS/PP must be shown to new requiredEmail users if there is
        // a site TOS/PP
        siteTOSPP: !!requiredEmail && self.siteTOSPP
      });

      startAction(false, "doSetPassword", info);
    }