function cd_render() {
    var contact = this._contact;

    var names = '';
    names += contact.givenName || '';
    names += ' ' + (contact.familyName || '');
    this.contactName.innerHTML = names;

    this.contactGivenNameField.value =
      contact.givenName;
    this.contactFamilyNameField.value =
      contact.familyName;

    document.getElementById('contact-photo').innerHTML =
      '<img src="style/images/contact-placeholder.png" alt="profile" />';

    this.contactPhoneField.value = '';
    if (contact.tel.length) {
      var number = contact.tel[0].number;
      this.contactPhone.querySelector('.value').innerHTML = number;
      this.contactPhone.dataset.number = number;

      this.contactPhoneField.value = number;
    }

    this.contactEmailField.value = '';
    if (this._contact.email.length) {
      this.contactEmail.querySelector('.value').innerHTML =
        contact.email[0];

      this.contactEmailField.value = contact.email[0];
    }

    this.favorited.checked = (contact.category &&
      (contact.category.indexOf('Favorites') != -1));
  }