function doShowContactDetails(contact) {
      detailsName.textContent = contact.name;
      var listContainer = document.getElementById('details-list');
      listContainer.innerHTML = '';
      for (var tel in contact.tel) {
        var telField = {
          number: contact.tel[tel].number,
          tel_type: '',
          notes: '',
          type: 'tel'
        };
        var template = owd.templates.render(phoneDetailsTemplate, telField);
        listContainer.appendChild(template);
      }
      for (var email in contact.email) {
        var emailField = {
          email: contact.email[email],
          email_tag: '', type: 'email'
        };
        var template = owd.templates.render(emailDetailsTemplate, emailField);
        listContainer.appendChild(template);
      }
      owd.templates.append(coverImg, contact);
      navigation.go(contactDetailsView, 'right-left');
    }