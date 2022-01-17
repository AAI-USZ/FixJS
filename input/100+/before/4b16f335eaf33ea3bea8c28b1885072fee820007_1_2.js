function(
  sectionOrCallback,
  optionOrCallback,
  valueOrCallback,
  callback
) {
  var section = (typeof(sectionOrCallback) === 'string') ?
        sectionOrCallback :
        null,
      option = (typeof(optionOrCallback) === 'string') ?
        optionOrCallback :
        null,
      value = (
        typeof(valueOrCallback) === 'string' ||
        typeof(valueOrCallback) === 'number' ||
        valueOrCallback === null
      ) ? valueOrCallback : undefined,
      options;
  callback = callback ||
    valueOrCallback ||
    optionOrCallback ||
    sectionOrCallback;

  options = {
    'method': (value !== undefined) ?
      ((value === null) ? 'DELETE' : 'PUT') :
      'GET',
    'path': '_config' +
      ((section) ? '/' + section : '') +
      ((option) ? '/' + option : ''),
    'callback': function(error, response) {
      if (error) {
        response = null;
      } else {
        response = true;
      }

      callback(error, response);
    }
  };

  // do we set a new value?
  if (typeof(value) === 'string' || typeof(value) === 'number') {
    options.body = '"' + value + '"'
  }

  this.request(options);
}