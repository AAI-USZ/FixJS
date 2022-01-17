function onsuccess() {
      myContact.id = contact.id;
      contactsList.refresh(myContact);
      reloadContactDetails(myContact);
      navigation.back();
    }