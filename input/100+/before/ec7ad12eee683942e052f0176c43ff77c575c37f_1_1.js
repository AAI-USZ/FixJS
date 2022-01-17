function initContacts(evt) {
    currentContactId = document.getElementById('contact-form-id');
    givenName = document.getElementById('givenName');
    company = document.getElementById('org');
    familyName = document.getElementById('familyName');
    detailsName = document.getElementById('contact-name-title');
    formTitle = document.getElementById('contact-form-title');
    phoneTemplate = document.getElementById('add-phone');
    emailTemplate = document.getElementById('add-email');
    phonesContainer = document.getElementById('contacts-form-phones');
    emailContainer = document.getElementById('contacts-form-email');
    contactDetails = document.getElementById('contact-detail');
    saveButton = document.getElementById('save-button');

    var list = document.getElementById('groups-list');
    contactsList.init(list);
    contactsList.load();

    contactsList.handleClick(function handleClick(id) {
      var options = {
        filterBy: ['id'],
        filterOp: 'equals',
        filterValue: id
      };

      var request = navigator.mozContacts.find(options);
      request.onsuccess = function findCallback() {
        currentContact = request.result[0];
        reloadContactDetails(currentContact);
        navigation.go('view-contact-details', 'right-left');
      };
    });

    var position = 0;
    contactDetails.addEventListener('mousedown', function(event) {
      if (contactDetails.classList.contains('no-photo'))
        return;

      var startPosition = event.clientY;
      var currentPosition;
      var initMargin = '8rem';
      contactDetails.classList.add('up');

      var onMouseMove = function onMouseMove(event) {
        currentPosition = event.clientY;
        var newMargin = currentPosition - startPosition;
        if (newMargin > 0 && newMargin < 200) {
          contactDetails.classList.remove('up');
          var calc = '-moz-calc(' + initMargin + ' + ' + newMargin + 'px)';
          contactDetails.style.marginTop = calc;
        }
      };

      var onMouseUp = function onMouseUp(event) {
        contactDetails.classList.add('up');
        contactDetails.style.marginTop = initMargin;
        contactDetails.removeEventListener('mousemove', onMouseMove);
        contactDetails.removeEventListener('mouseup', onMouseUp);
      };

      contactDetails.addEventListener('mousemove', onMouseMove);
      contactDetails.addEventListener('mouseup', onMouseUp);
    });
  }