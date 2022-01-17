function(passwordNeeded) {
        if(passwordNeeded) {
          self.addEmailEmail = info.email;
          // cancel is disabled if the user is doing the initial password set
          // for a requiredEmail.
          info.cancelable = !requiredEmail;
          startAction(false, "doSetPassword", info);
        }
        else {
          startAction(false, "doStageEmail", info);
        }

        complete(info.complete);
      }