function onSuccess(savedContact) {
        currentContact = savedContact;
        myContact.id = savedContact.id;
        myContact.photo = savedContact.photo;
        myContact.category = savedContact.category;
        if (ActivityHandler.currentlyHandling) {
          ActivityHandler.create(myContact);
        } else {
          contactsList.refresh(myContact);
          reloadContactDetails();
          navigation.back();
        }
      }