function re_updateContactDetails() {
    var itemSelector = '.log-item';
    var callLogItems = document.querySelectorAll(itemSelector);
    var length = callLogItems.length;
    for (var i = 0; i < length; i++) {
      Contacts.findByNumber(
        callLogItems[i].querySelector('.primary-info').textContent.trim(),
        function re_contactCallBack(itemLogEl, contact) {
          if (contact) {
            if (contact.name) {
              itemLogEl.querySelector('.primary-info').textContent =
                contact.name;
            }
            if (contact.photo) {
              itemLogEl.querySelector('.call-log-contact-photo').
                style.backgroundImage = 'url(' + contact.photo + ')';
            }
          }
        }.bind(this, callLogItems[i]));
    }
  }