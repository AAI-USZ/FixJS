function saveContact() {
    saveButton.setAttribute('disabled', 'disabled');
    var name = [givenName.value] || [''];
    var lastName = [familyName.value] || [''];
    var org = [company.value] || [''];
    var myContact = {
      id: document.getElementById('contact-form-id').value,
      givenName: name,
      familyName: lastName,
      additionalName: '',
      org: org,
      name: name[0] + ' ' + lastName[0]
    };

    getPhones(myContact);
    getEmails(myContact);

    var contact;
    if (myContact.id) { //Editing a contact
      currentContact.tel = [];
      currentContact.email = [];
      for (var field in myContact) {
        currentContact[field] = myContact[field];
      }
      contact = currentContact;
    } else {
      contact = new mozContact();
      contact.init(myContact);
    }

    var request = navigator.mozContacts.save(contact);
    request.onsuccess = function onsuccess() {
      // Reloading contact, as it only allows to be
      // updated once
      var cList = contacts.List;
      cList.getContactById(contact.id, function onSuccess(savedContact) {
        currentContact = savedContact;
        myContact.id = savedContact.id;
        myContact.photo = savedContact.photo;
        contactsList.refresh(myContact);
        reloadContactDetails(myContact);
        navigation.back();
      }, function onError() {
        saveButton.removeAttribute('disabled');
        console.error('Error reloading contact');
      });
    };

    request.onerror = function onerror() {
      console.error('Error saving contact');
    }
  }