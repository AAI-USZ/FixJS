function reloadContactDetails(contact) {
    detailsName.textContent = contact.name;
    if (contact.category && contact.category.indexOf('favorite') != -1) {
      detailsName.innerHTML += '<sup></sup>';
    }
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

    var phonesTemplate = document.getElementById('phone-details-template-#i#');
    for (var tel in contact.tel) {
      var currentTel = contact.tel[tel];
      var telField = {
        number: currentTel.number || '',
        type: currentTel.type || TAG_OPTIONS['phone-type'][0].value,
        notes: '',
        i: tel
      };
      var template = utils.templates.render(phonesTemplate, telField);
      listContainer.appendChild(template);
    }

    var emailsTemplate = document.getElementById('email-details-template-#i#');
    for (var email in contact.email) {
      var currentEmail = contact.email[email];
      var emailField = {
        address: currentEmail['address'] || '',
        type: currentEmail['type'] || '',
        i: email
      };
      var template = utils.templates.render(emailsTemplate, emailField);
      listContainer.appendChild(template);
    }

    var selector = document.getElementById('address-details-template-#i#');
    var addressesTemplate = selector;
    for (var i in contact.adr) {
      var currentAddress = contact.adr[i];
      var addressField = {
        streetAddress: currentAddress['streetAddress'],
        postalCode: currentAddress['postalCode'] || '',
        locality: currentAddress['locality'] || '',
        countryName: currentAddress['countryName'] || '',
        type: currentAddress['type'] || TAG_OPTIONS['address-type'][0].value,
        i: i
      };
      var template = utils.templates.render(addressesTemplate, addressField);
      listContainer.appendChild(template);
    }

    if (contact.note && contact.note.length > 0) {
      var container = document.createElement('li');
      var title = document.createElement('h2');
      title.textContent = 'Comments';
      container.appendChild(title);
      var notesTemplate = document.getElementById('note-details-template-#i#');
      for (var i in contact.note) {
        var currentNote = contact.note[i];
        var noteField = {
          note: currentNote || '',
          i: i
        };
        var template = utils.templates.render(notesTemplate, noteField);
        container.appendChild(template);
        listContainer.appendChild(container);
      }
    }


    var existsPhoto = 'photo' in contact && contact.photo;
    if (existsPhoto) {
      var detailsInner = document.getElementById('contact-detail-inner');
      contactDetails.classList.add('up');
      var photoOffset = (photoPos + 1) * 10;
      if ((detailsInner.offsetHeight + photoOffset) < cover.clientHeight) {
        cover.style.overflow = 'hidden';
      } else {
        cover.style.overflow = null;
      }
      cover.style.backgroundImage = 'url(' + (contact.photo || '') + ')';
    } else {
      cover.style.overflow = null;
      cover.style.backgroundImage = null;
      contactDetails.style.transform = null;
      contactDetails.classList.add('no-photo');
    }
  }