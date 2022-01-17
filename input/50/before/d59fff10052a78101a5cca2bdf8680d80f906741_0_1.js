function successDelete() {
      contactsList.remove(currentContact.id);
      currentContact = null;
      navigation.home();
    }