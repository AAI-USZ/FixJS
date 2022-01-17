function(el) {
    switch (el.type) {
      case 'text':
      case 'textarea':
      case 'password':
      case 'select-one':
      case 'radio':
        return el.value;
      case 'checkbox':
        return el.checked;
    }
  }