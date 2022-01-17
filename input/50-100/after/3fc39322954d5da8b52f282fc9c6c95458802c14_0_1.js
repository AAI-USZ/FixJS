function insertEmptyPhone() {
    var telField = {
      number: '',
      type: TAG_OPTIONS['phone-type'][0].value,
      notes: '',
      i: numberPhones || 0
    };
    var template = utils.templates.render(phoneTemplate, telField);
    phonesContainer.appendChild(template);
    numberPhones++;
  }