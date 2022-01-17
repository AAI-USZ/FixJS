function lookupContact(contact) {
      if (contact.name){
        CallScreen.update(contact.name);
      }
      if (contact.photo) {
        CallScreen.setCallerContactImage(contact.photo);
      }
    }