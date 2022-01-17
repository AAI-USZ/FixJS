function(msg, info) {
      // add_email indicates the user wishes to add an email to the account,
      // the add_email screen must be displayed.  After the user enters the
      // email address they wish to add, add_email will trigger
      // either 1) primary_user or 2) email_staged. #1 occurs if the email
      // address is a primary address, #2 occurs if the address is a secondary
      // and the verification email has been sent.
      startAction("doAddEmail", info);
    }