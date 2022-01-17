function insertEmptyEmail(index) {
    var emailField = {
      email: '',
      type: '',
      i: index || 0
    };

    var template = utils.templates.render(emailTemplate, emailField);
    emailContainer.appendChild(template);
    numberEmails++;
  }