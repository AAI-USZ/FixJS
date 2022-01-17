function(rule) {
      if (match(checks, rule['conds'])) {
        messages.append('<li>' + rule['msg'] + '</li>');
      }
    }