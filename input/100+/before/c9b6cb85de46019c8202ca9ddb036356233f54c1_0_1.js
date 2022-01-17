function reloadContactDetails(contact) {
    detailsName.textContent = contact.name;
    contactDetails.classList.remove('no-photo');
    contactDetails.classList.remove('up');

    var orgTitle = document.getElementById('org-title');
    if (contact.org && contact.org[0] != '') {
      orgTitle.textContent = contact.org[0];
      orgTitle.className = '';
    } else {
      orgTitle.className = 'hide';
      orgTitle.textContent = '';
    }
    var listContainer = document.getElementById('details-list');
    listContainer.innerHTML = '';

    var phonesTemplate = document.getElementById('phone-details-template');
    for (var tel in contact.tel) {
      var currentTel = contact.tel[tel];
      var telField = {
        number: currentTel.number || '',
        type: currentTel.type || TAG_OPTIONS['phone-type'][0].value,
        notes: ''
      };
      var template = utils.templates.render(phonesTemplate, telField);
      listContainer.appendChild(template);
    }

    var emailsTemplate = document.getElementById('email-details-template');
    for (var email in contact.email) {
      var currentEmail = contact.email[email];
      var emailField = {
        address: currentEmail['address'] || '',
        type: currentEmail['type'] || ''
      };
      var template = utils.templates.render(emailsTemplate, emailField);
      listContainer.appendChild(template);
    }

    var addressesTemplate = document.getElementById('address-details-template');
    for (var i in contact.adr) {
      var currentAddress = contact.adr[i];
      var addressField = {
        streetAddress: currentAddress['streetAddress'],
        postalCode: currentAddress['postalCode'] || '',
        locality: currentAddress['locality'] || '',
        countryName: currentAddress['countryName'] || '',
        type: currentAddress['type'] || TAG_OPTIONS['address-type'][0].value
      };
      var template = utils.templates.render(addressesTemplate, addressField);
      listContainer.appendChild(template);
    }

    if ('note' in contact && contact.note.length > 0) {
      var title = document.createElement('h2');
      title.textContent = 'Comments';
      listContainer.appendChild(title);
      var notesTemplate = document.getElementById('note-details-template');
      for (var i in contact.note) {
        var currentNote = contact.note[i];
        var noteField = {
          note: currentNote || ''
        };
        var template = utils.templates.render(noteTemplate, noteField);
        listContainer.appendChild(template);
      }
    }

    var cover = document.getElementById('cover-img');
    var existsPhoto = 'photo' in contact && contact.photo;
    if (existsPhoto) {
      contactDetails.classList.add('up');
      cover.style.backgroundImage = 'url(' + (contact.photo || '') + ')';
    } else {
      cover.style.backgroundImage = null;
      contactDetails.style.marginTop = null;
      contactDetails.classList.add('no-photo');
    }

    //Removes unnecesary scroll
    if (contactDetails.offsetHeight == cover.clientHeight) {
      cover.style.overflow = 'hidden';
    } else {
      cover.style.overflow = null;
    }
  }