function (e) {
    var buttons = $('[type="submit"]', this);
    switch (e.type) {
    case 'ajax:beforeSend':
    case 'submit':
      buttons.attr('disabled', 'disabled');
      break;
    case 'ajax:complete':
    default:
      buttons.removeAttr('disabled');
      break;
    }
  }