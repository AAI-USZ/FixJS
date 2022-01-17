function thui_updateHeaderData(number) {
    ThreadUI.title.innerHTML = number;
    ContactDataManager.getContactData(number, function gotContact(contact) {
      if (contact && contact.length > 0) {
        ThreadUI.title.innerHTML = contact[0].name;
      }
    });
  }