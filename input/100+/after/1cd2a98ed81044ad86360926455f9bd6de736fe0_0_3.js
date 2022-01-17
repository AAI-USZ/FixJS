function toggleFavorite() {
    var favorite = !isFavorite(currentContact);
    toggleFavoriteMessage(favorite);
    if (favorite) {
      currentContact.category = currentContact.category || [];
      currentContact.category.push('favorite');
    } else {
      if (!currentContact.category) {
        return;
      }
      var pos = currentContact.category.indexOf('favorite');
      if (pos > -1) {
        delete currentContact.category[pos];
      }
    }

    var request = navigator.mozContacts.save(currentContact);
    request.onsuccess = function onsuccess() {
      var cList = contacts.List;
      cList.getContactById(currentContact.id, function onSuccess(savedContact) {
        currentContact = savedContact;
        contactsList.refresh(currentContact);
        reloadContactDetails();
      }, function onError() {
        console.error('Error reloading contact');
      });
    };
    request.onerror = function onerror() {
      console.error('Error saving favorite');
    };
  }