function deleteContact(contact) {
    var request = navigator.mozContacts.remove(currentContact);
    request.onsuccess = function successDelete() {
      contactsList.remove(currentContact.id);
      currentContact = null;
      navigation.home();
    };
    request.onerror = function errorDelete() {
      console.error('Error removing the contact');
    };
  }