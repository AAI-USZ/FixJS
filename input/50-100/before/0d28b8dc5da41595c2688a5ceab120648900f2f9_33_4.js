function thui_updateHeaderData() {
    var number = MessageManager.getNumFromHash();
    ThreadUI.title.innerHTML = number;
    ContactDataManager.getContactData(number, function gotContact(contact) {
      if (contact && contact.length > 0) {
        ThreadUI.title.innerHTML = contact[0].name;
      }
    });
  }