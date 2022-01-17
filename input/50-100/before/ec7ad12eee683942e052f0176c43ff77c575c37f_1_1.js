function insertEmptyEmail() {
    var emailField = {
      email: '',
      type: '',
      i: numberEmails || 0
    };

    var template = utils.templates.render(emailTemplate, emailField);
    emailContainer.appendChild(template);
    numberEmails++;
  }