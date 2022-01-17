function ContactsPresenter(display, model) {
  this.display = display;
  this.model = model;

  var that = this;

  // Button Handlers  ---------------------------------------------------
  display.onAddContact = function(contactEmail) {
    that.model.addNewContact(contactEmail, function(err, data) {
      if (data) {
        that.display.showMessage('Contact added!');
      } else {
        that.display.showMessage('Contact could not be added.');
      }
    });
  };
  display.onContactClick = function(contact) {
    // Forward to the BUS => Other Module
    BUS.fire('contact.clicked', {
      'contact': contact,
      'actions': [
        {title: 'Remove Contact', callback: function() {
          that.removeContactFromRooster(contact.id);
        }}
      ]
    });
  };
  display.onWhoamiClick = function() {
    var pos = that.display.$whoami.offset();
    pos.top += that.display.$whoami.outerHeight() + 5;
    pos.left += 5;
    BUS.fire('ui.profile.show', pos);
  };

  // WhoAmI  ---------------------------------------------------
  model.on('update', this.refreshContacts, this);

  // Initial rendering
  if (model.getUser()) {
    this.display.renderWhoAmI(model.getUser());
  }
  return that;
}