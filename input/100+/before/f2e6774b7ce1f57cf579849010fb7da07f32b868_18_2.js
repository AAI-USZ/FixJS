function contactsShow(contacts) {
    var content = '';
    var currentLetter = '';

    var count = contacts.length;
    for (var i = 0; i < count; i++) {
      var contact = contacts[i];

      var name = contact.familyName[0];
      var letter = name ? name[0].toUpperCase() : '';
      if (currentLetter != letter) {
        currentLetter = letter;

        content += '<div id="' + currentLetter + '" class="contact-header">' +
                   '<span>' +
                      currentLetter +
                   '</span></div>';
      }

      content += this._contactFragment(contact);
    }

    var contactsContainer = document.getElementById('contacts-container');
    contactsContainer.innerHTML = content;
    //this.filter();
  }