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
      var telField = {
        number: contact.tel[tel].number || '',
        type: contact.tel[tel].type || TAG_OPTIONS['phone-type'][0].value,
        notes: ''
      };
      var template = utils.templates.render(phonesTemplate, telField);
      listContainer.appendChild(template);
    }

    var emailsTemplate = document.getElementById('email-details-template');
    for (var email in contact.email) {
      var emailField = {
        email: contact.email[email],
        type: ''
      };
      var template = utils.templates.render(emailsTemplate, emailField);
      listContainer.appendChild(template);
    }

    var cover = document.getElementById('cover-img');
    var existsPhoto = 'photo' in contact && contact.photo != null;
    if (existsPhoto && contact.photo != '') {
      contactDetails.classList.add('up');
      cover.style.backgroundImage = 'url(' + (contact.photo || '') + ')';
    } else {
      cover.style.backgroundImage = null;
      contactDetails.style.marginTop = null;
      contactDetails.classList.add('no-photo');
    }
  }