function(el) {
    switch (el.type) {
      case 'text':
      case 'textarea':
      case 'password':
      case 'select-one':
        return el.value;
      case 'checkbox':
      case 'radio':
        return el.checked;
    }
  }