function onsuccess(contact) {
      contactsList.refresh(contact);
      reloadContactDetails(contact);
      navigation.back();
    }