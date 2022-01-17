function(event) {
      if ($(event.target).is(radios))
        radioClick(event.target, event);
      else if ($(event.target).is(checks))
        checkboxClick(event.target, event);
      else if ($(event.target).is(others))
        othersChange(event.target, event);
    }