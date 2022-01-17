function getPhones(contact) {
    var selector = '#view-contact-form form input[data-field="number"]';
    var phones = document.querySelectorAll(selector);
    for (var phone in phones) {
      var numberField = phones[phone].value;
      if (!numberField)
        continue;

      var selector = 'tel_type_' + phone;
      var typeField = document.getElementById(selector).textContent || '';
      var notes = document.getElementById('notes_' + phone).value || '';
      contact['tel'] = contact['tel'] || [];
      // TODO: Save notes
      contact['tel'][phone] = {
        number: numberField,
        type: typeField
      };
    }
  }