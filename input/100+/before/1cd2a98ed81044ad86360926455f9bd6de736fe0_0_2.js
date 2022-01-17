function showEdit() {
    resetForm();
    deleteContactButton.classList.remove('hide');
    formTitle.innerHTML = 'Edit contact';
    currentContactId.value = currentContact.id;
    givenName.value = currentContact.givenName;
    familyName.value = currentContact.familyName;
    company.value = currentContact.org;
    var default_type = TAG_OPTIONS['phone-type'][0].value;
    for (var tel in currentContact.tel) {
      var currentTel = currentContact.tel[tel];
      var telField = {
        number: currentTel.number,
        type: currentTel.type || default_type,
        notes: '',
        i: tel
      };

      var template = utils.templates.render(phoneTemplate, telField);
      template.appendChild(removeFieldIcon(template.id));
      phonesContainer.appendChild(template);
      numberPhones++;
    }

    for (var email in currentContact.email) {
      var currentEmail = currentContact.email[email];
      var default_type = TAG_OPTIONS['email-type'][0].value;
      var emailField = {
        address: currentEmail['address'] || '',
        type: currentEmail['type'] || default_type,
        i: email
      };

      var template = utils.templates.render(emailTemplate, emailField);
      template.appendChild(removeFieldIcon(template.id));
      emailContainer.appendChild(template);
      numberEmails++;
    }

    toggleFavoriteMessage(isFavorite(currentContact));
    for (var adr in currentContact.adr) {
      var currentAddress = currentContact.adr[adr];
      var default_type = TAG_OPTIONS['address-type'][0].value;
      var adrField = {
        streetAddress: currentAddress['streetAddress'],
        postalCode: currentAddress['postalCode'] || '',
        locality: currentAddress['locality'] || '',
        countryName: currentAddress['countryName'] || '',
        type: currentAddress['type'] || default_type,
        i: adr
      };

      var template = utils.templates.render(addressTemplate, adrField);
      template.appendChild(removeFieldIcon(template.id));
      addressContainer.appendChild(template);
      numberAddresses++;
    }

    for (var index in currentContact.note) {
      var currentNote = currentContact.note[index];
      var noteField = {
        note: currentNote || '',
        i: index
      };
      var template = utils.templates.render(noteTemplate, noteField);
      template.appendChild(removeFieldIcon(template.id));
      noteContainer.appendChild(template);
      numberNotes++;
    }

    deleteContactButton.onclick = function deleteClicked(event) {
      var msg = 'Are you sure you want to remove this contact?';
      Permissions.show('', msg, function onAccept() {
        deleteContact(currentContact);
      },function onCancel() {
        Permissions.hide();
      });
    };

    edit();
  }