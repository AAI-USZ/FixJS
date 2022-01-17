function getPhones(contact) {
    var selector = '#view-contact-form form div.phone-template';
    var phones = document.querySelectorAll(selector);
    for (var i = 0; i < phones.length; i++) {
      var currentPhone = phones[i];
      var arrayIndex = currentPhone.dataset.index;
      var numberField = document.getElementById('number_' + arrayIndex);
      var numberValue = numberField.value;
      if (!numberValue)
        continue;

      var selector = 'tel_type_' + arrayIndex;
      var typeField = document.getElementById(selector).textContent || '';
      var notes = document.getElementById('notes_' + arrayIndex).value || '';
      contact['tel'] = contact['tel'] || [];
      // TODO: Save notes
      contact['tel'][i] = {
        number: numberValue,
        type: typeField
      };
    }
  }