function () {
      el = $(this);
      var type = el.attr('type');
      if (
        !this.disabled && type != 'submit' && type != 'reset' && type != 'button' &&
        ((type != 'radio' && type != 'checkbox') || this.checked)
      ) {
        result.push({
          name: el.attr('name'),
          value: el.val()
        });
      }
    }