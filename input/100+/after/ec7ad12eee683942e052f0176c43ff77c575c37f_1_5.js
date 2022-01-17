function getEmails(contact) {
    var selector = '#view-contact-form form div.email-template';
    var emails = document.querySelectorAll(selector);
    for (var i = 0; i < emails.length; i++) {
      var currentEmail = emails[i];
      var arrayIndex = currentEmail.dataset.index;
      var emailField = document.getElementById('email_' + arrayIndex);
      var emailValue = emailField.value;
      if (!emailValue)
        continue;

      // TODO: Save type
      contact['email'] = contact['email'] || [];
      contact['email'][i] = emailValue;
    }
  }