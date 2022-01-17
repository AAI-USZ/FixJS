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
        }