function re_createEntry(recent) {
    var innerFragment = '<img src="style/images/contact-placeholder.png"' +
                        '  alt="profile" />' +
                        '<div class="name">' +
                        '  ' + (recent.number || 'Anonymous') +
                        '</div>' +
                        '<div class="number"></div>' +
                        '<div class="timestamp" data-time="' +
                        '  ' + recent.date + '">' +
                        '  ' + prettyDate(recent.date) +
                        '</div>' +
                        '<div class="type"></div>';

    var entry = document.createElement('div');
    entry.classList.add('recent');
    entry.classList.add(recent.type);
    entry.dataset.number = recent.number;
    entry.innerHTML = innerFragment;

    if (recent.number) {
      Contacts.findByNumber(recent.number, (function(contact) {
        this.querySelector('.name').textContent = contact.name;
        this.querySelector('.number').textContent = contact.tel[0].number;
      }).bind(entry));
    }

    return entry;
  }