function resetForm() {
    saveButton.removeAttribute('disabled');
    currentContactId.value = '';
    givenName.value = '';
    familyName.value = '';
    company.value = '';
    var phones = document.getElementById('contacts-form-phones');
    var emails = document.getElementById('contacts-form-email');
    phones.innerHTML = '';
    emails.innerHTML = '';
    numberEmails = 0;
    numberPhones = 0;
  }