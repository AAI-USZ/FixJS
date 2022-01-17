function contactsInit() {
      detailsHeader = document.getElementById('details-view-header');
      givenName = document.getElementById('givenName');
      familyName = document.getElementById('familyName');
      coverImg = document.getElementById('cover-img');
      formTitle = document.getElementById('contact-form-title');
      formActions = document.getElementById('contact-form-actions');
      phoneTemplate = document.getElementById('add-phone');
      emailTemplate = document.getElementById('add-email');
      phoneDetailsTemplate =document.getElementById('phone-details-template');
      emailDetailsTemplate =document.getElementById('email-details-template');
      phonesContainer = document.getElementById('contacts-form-phones');
      emailContainer = document.getElementById('contacts-form-email');
      cList.init('groups-list');
      cList.load();
      cList.addEventListener('click', function(contact) {
        console.log('Contact clicked: ' + contact.id);
        currentContact = contact;
        doShowContactDetails(contact);
      });
    }