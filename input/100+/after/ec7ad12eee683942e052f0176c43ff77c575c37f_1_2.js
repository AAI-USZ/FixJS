function showEdit() {
    resetForm();
    formTitle.innerHTML = 'Edit contact';
    currentContactId.value = currentContact.id;
    givenName.value = currentContact.givenName;
    familyName.value = currentContact.familyName;
    company.value = currentContact.org;
    for (var tel in currentContact.tel) {
      var telField = {
        number: currentContact.tel[tel].number,
        type: currentContact.tel[tel].type,
        notes: '',
        i: tel
      };

      var template = utils.templates.render(phoneTemplate, telField);
      template.appendChild(removeFieldIcon('add-phone-' + tel));
      phonesContainer.appendChild(template);
      numberPhones++;
    }

    for (var email in currentContact.email) {
      var emailField = {
        email: currentContact.email[email],
        type: '',
        i: email
      };

      var template = utils.templates.render(emailTemplate, emailField);
      template.appendChild(removeFieldIcon('add-email-' + email));
      emailContainer.appendChild(template);
      numberEmails++;
    }

    edit();
  }