function getEmails(contact) {
    var selector = '#view-contact-form form input[name="email"]';
    var emails = document.querySelectorAll(selector);
    for (var email in emails) {
      var emailField = emails[email].value;
      if (!emailField)
        continue;

      // TODO: Save type
      contact['email'] = contact['email'] || [];
      contact['email'][email] = emailField;
    }
  }