function saveContact() {
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
      myContact.id = contact.id;
      contactsList.refresh(myContact);
      reloadContactDetails(myContact);
      navigation.back();
    };

    request.onerror = function onerror() {
      console.error('Error saving contact');
    }
  }