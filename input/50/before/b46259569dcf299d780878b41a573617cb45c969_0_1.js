function(value) {
      if (match(checks, value['conds'])) {
        messages.append('<li>' + value['msg'] + '</li>');
      }
    }