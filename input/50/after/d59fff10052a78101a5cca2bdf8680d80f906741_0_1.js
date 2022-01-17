function successDelete() {
      contactsList.remove(currentContact.id);
      currentContact = {};
      navigation.home();
    }