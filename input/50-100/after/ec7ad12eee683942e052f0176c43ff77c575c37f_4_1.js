function re_updateContactDetails() {
    var itemSelector = '.log-item .primary-info';
    var commLogItemPhoneNumbers = document.querySelectorAll(itemSelector);
    var length = commLogItemPhoneNumbers.length;
    for (var i = 0; i < length; i++) {
      Contacts.findByNumber(commLogItemPhoneNumbers[i].textContent.trim(),
        function re_contactCallBack(phoneNumberEl, contact) {
          if (contact && contact.name) {
            phoneNumberEl.textContent = contact.name;
          }
        }.bind(this, commLogItemPhoneNumbers[i]));
    }
  }