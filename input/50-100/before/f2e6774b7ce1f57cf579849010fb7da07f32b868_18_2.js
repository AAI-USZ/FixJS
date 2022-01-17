function contactsCreate() {
    // creating an empty contact
    var contact = new mozContact();
    contact.init({tel: [], email: []});

    ContactDetails.show(contact);
  }