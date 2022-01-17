function onsuccess() {
      myContact.id = contact.id;
      myContact.photo = contact.photo;
      contactsList.refresh(myContact);
      reloadContactDetails(myContact);
      navigation.back();
    }