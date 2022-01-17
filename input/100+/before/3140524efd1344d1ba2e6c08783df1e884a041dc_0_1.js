function saveContact() {
    var givenName = [givenName.value] || [''];
    var familyName = [familyName.value] || [''];

    var myContact = {
      id: document.getElementById('contact-form-id').value,
      givenName: givenName,
      familyName: familyName,
      name: givenName[0] + ' ' + familyName[0]
    }

    getPhones(myContact);
    getEmails(myContact);

    var contact;
    if (myContact.id) { //Editing a contact
      for (var field in myContact) {
        currentContact[field] = myContact[field];
      }
      contact = currentContact;
    } else {
      contact = new mozContact();
      contact.init(myContact);
    }

    var request = navigator.mozContacts.save(contact);
    request.onsuccess = function onsuccess(contact) {
      contactsList.refresh(contact);
      reloadContactDetails(contact);
      navigation.back();
    };

    request.onerror = function onerror() {
      console.error('Error saving contact');
    }
  }