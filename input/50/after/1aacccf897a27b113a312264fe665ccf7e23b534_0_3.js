function(el, value) {
      if (el.type === 'radio') {
        return el.checked = el.value !== value;
      } else {
        return el.checked = !value;
      }
    }