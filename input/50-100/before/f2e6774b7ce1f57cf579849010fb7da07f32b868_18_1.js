function contactsShowFavorites(contacts) {
    var count = contacts.length;

    if (count == 0)
      return;

    var content = '<div id="favorites" class="contact-header">' +
                  '<span>*</span></div>';

    for (var i = 0; i < count; i++) {
      var contact = contacts[i];
      content += this._contactFragment(contact);
    }

    this.favoritesContainer.innerHTML = content;
  }